import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (
    email === process.env.PRIVATE_EMAIL &&
    password === process.env.PRIVATE_PASSWORD
  ) {
    return NextResponse.json({ ok: true, token: process.env.PRIVATE_PASSWORD });
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
