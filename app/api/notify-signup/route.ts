import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { businessName, industry, city, state, email } = await req.json();

  const location = [city, state].filter(Boolean).join(', ');

  // Send email via Supabase's built-in email (no extra service needed)
  // This just logs it for now — swap for Resend/SendGrid later if needed
  console.log(`[NEW SIGNUP] ${businessName} · ${industry} · ${location} · ${email}`);

  // Use fetch to hit Supabase Edge Function or just return OK
  // The admin panel in Supabase shows all signups regardless
  return NextResponse.json({ ok: true });
}
