import crypto from 'node:crypto';
import { createClient } from 'npm:@insforge/sdk';

export default async function(request: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-razorpay-signature',
  };

  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const signature = request.headers.get('x-razorpay-signature');
    const bodyText = await request.text();

    if (!signature || !bodyText) {
      return new Response('Missing signature or body', { status: 400 });
    }

    const secret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
    if (!secret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not set');
      return new Response('Server configuration error', { status: 500 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(bodyText)
      .digest('hex');

    if (expectedSignature !== signature) {
      return new Response('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(bodyText);
    console.log(`Received Razorpay webhook event: ${event.event}`);

    const supabaseUrl = Deno.env.get('INSFORGE_BASE_URL') || Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('ANON_KEY') || Deno.env.get('SUPABASE_ANON_KEY');
    const supabase = createClient({ baseUrl: supabaseUrl || '', anonKey: supabaseKey || '' });

    // Handle payment failures
    if (event.event === 'payment.failed' || event.event === 'subscription.charged.failed') {
      const payload = event.payload.payment?.entity || event.payload.subscription?.entity;
      if (!payload) return new Response('ok');

      // We need to find the card to suspend.
      // 1. Check notes for card_id or slug
      const notes = payload.notes || {};
      let cardId = notes.card_id;
      const slug = notes.slug;

      // 2. If no card_id/slug in notes, try to find via email
      const email = payload.email;

      if (!cardId && slug) {
        const { data: card } = await supabase.database
          .from('cards')
          .select('id')
          .eq('slug', slug)
          .maybeSingle();
        if (card) cardId = card.id;
      }

      if (!cardId && email) {
        const { data: profile } = await supabase.database
          .from('profiles')
          .select('id, cards(id)')
          .eq('email', email)
          .maybeSingle();
        
        if (profile && profile.cards && profile.cards.length > 0) {
          cardId = profile.cards[0].id; // assuming 1 card per profile
        }
      }

      if (cardId) {
        // Update subscription last_payment_status to failed
        const { error } = await supabase.database
          .from('subscriptions')
          .update({ last_payment_status: 'failed' })
          .eq('card_id', cardId);

        if (error) {
          console.error(`Failed to update subscription for card ${cardId}:`, error);
        } else {
          console.log(`Successfully marked payment as failed for card ${cardId}`);
        }
      } else {
        console.warn(`Could not find a matching card for failed payment. Email: ${email}`);
      }
    } 
    // Handle successful payments to reactivate or extend
    else if (event.event === 'payment.captured' || event.event === 'subscription.charged') {
        const payload = event.payload.payment?.entity || event.payload.subscription?.entity;
        if (!payload) return new Response('ok');

        const notes = payload.notes || {};
        let cardId = notes.card_id;
        const slug = notes.slug;
        const email = payload.email;

        if (!cardId && slug) {
          const { data: card } = await supabase.database
            .from('cards')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();
          if (card) cardId = card.id;
        }

        if (!cardId && email) {
          const { data: profile } = await supabase.database
            .from('profiles')
            .select('id, cards(id)')
            .eq('email', email)
            .maybeSingle();
          
          if (profile && profile.cards && profile.cards.length > 0) {
            cardId = profile.cards[0].id;
          }
        }

        if (cardId) {
          // Update subscription last_payment_status to success and push next_bill_date
          const nextBillDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // +30 days
          const { error } = await supabase.database
            .from('subscriptions')
            .update({ 
                last_payment_status: 'captured',
                next_bill_date: nextBillDate
            })
            .eq('card_id', cardId);

          if (error) {
            console.error(`Failed to update subscription for card ${cardId}:`, error);
          } else {
            console.log(`Successfully processed payment capture for card ${cardId}`);
          }
        }
    }

    return new Response('ok', { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal Server Error', { status: 500, headers: corsHeaders });
  }
}
