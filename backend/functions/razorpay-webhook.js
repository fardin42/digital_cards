import { createClient } from 'npm:@insforge/sdk';

const RAZORPAY_WEBHOOK_SECRET = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
const DB_URL = Deno.env.get('INSFORGE_BASE_URL');
const ANON_KEY = Deno.env.get('ANON_KEY');

export default async function(request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });

  try {
    const bodyText = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    // 1. Verify Webhook Signature
    const expectedSignature = await computeHmac(bodyText, RAZORPAY_WEBHOOK_SECRET || "");
    if (expectedSignature !== signature) {
      console.error("Invalid Webhook Signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 401, headers });
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;
    const client = createClient({ baseUrl: DB_URL || "", anonKey: ANON_KEY || "" });

    console.log(`Processing Webhook Event: ${event}`);

    // 2. Handle Subscription Updates
    if (event === 'subscription.charged' || event === 'subscription.activated') {
      const subId = payload.payload.subscription.entity.id;
      const nextBillDate = new Date(payload.payload.subscription.entity.current_end * 1000).toISOString();

      const { data: subData } = await client.database.from('subscriptions')
        .select('card_id')
        .eq('razorpay_subscription_id', subId)
        .maybeSingle();

      if (subData) {
        await client.database.from('cards').update({ status: 'active' }).eq('id', subData.card_id);
        await client.database.from('subscriptions').update({ 
          last_payment_status: 'captured',
          next_bill_date: nextBillDate
        }).eq('razorpay_subscription_id', subId);
      }
    }

    if (event === 'subscription.halted' || event === 'subscription.cancelled' || event === 'payment.failed') {
      const subId = payload.payload.subscription?.entity?.id || payload.payload.payment?.entity?.subscription_id;
      
      if (subId) {
        const { data: subData } = await client.database.from('subscriptions')
          .select('card_id')
          .eq('razorpay_subscription_id', subId)
          .maybeSingle();

        if (subData) {
          await client.database.from('cards').update({ status: 'suspended' }).eq('id', subData.card_id);
          await client.database.from('subscriptions').update({ last_payment_status: 'failed' }).eq('razorpay_subscription_id', subId);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200, headers });

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Webhook Error:", msg);
    return new Response(JSON.stringify({ error: msg }), { status: 400, headers });
  }
}

async function computeHmac(data, secret) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(data);
  const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, msgData);
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, "0")).join("");
}
