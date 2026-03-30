import { createClient } from 'npm:@insforge/sdk';

const DB_URL = Deno.env.get('INSFORGE_BASE_URL');
const ANON_KEY = Deno.env.get('ANON_KEY');

export default async function(request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });

  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (!slug) throw new Error("Missing slug parameter");

    const client = createClient({ baseUrl: DB_URL || "", anonKey: ANON_KEY || "" });

    // Check card status joined with subscription info
    const { data: card, error: cError } = (await client.database
      .from('cards')
      .select('status, id, profiles(name)')
      .eq('slug', slug)
      .maybeSingle()) as any;

    if (cError) throw new Error(`Database error: ${cError.message}`);

    if (!card) {
      return new Response(JSON.stringify({ 
        allowed: false, 
        reason: "not_found",
        message: "Digital card not found."
      }), { status: 404, headers });
    }

    if (card.status !== 'active') {
        const { data: sub } = await client.database
          .from('subscriptions')
          .select('last_payment_status, next_bill_date')
          .eq('card_id', card.id)
          .maybeSingle();

        return new Response(JSON.stringify({
            allowed: false,
            reason: "suspended",
            message: "This card is temporarily suspended due to billing.",
            details: sub
        }), { status: 403, headers });
    }

    return new Response(JSON.stringify({ 
        allowed: true,
        client: card.profiles?.name || "Member"
    }), { status: 200, headers });

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), { status: 400, headers });
  }
}
