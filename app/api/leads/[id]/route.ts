import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isOwner } from '@/lib/lead-pipeline';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isOwner(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const allowed = ['new', 'contacted', 'replied', 'won', 'rejected'];
  if (!allowed.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const { error } = await adminDb().from('leads').update({ status: body.status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
