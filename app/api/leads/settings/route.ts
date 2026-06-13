import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isOwner } from '@/lib/lead-pipeline';

export async function GET(req: NextRequest) {
  if (!(await isOwner(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data } = await adminDb().from('lead_settings').select('*').eq('id', 1).single();
  return NextResponse.json(data ?? {});
}

export async function PUT(req: NextRequest) {
  if (!(await isOwner(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const allowed = ['target_states', 'vertical_keywords', 'size_min', 'size_max',
    'sweet_spot_min', 'sweet_spot_max', 'allowed_titles', 'batch_size'];

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }

  const { error } = await adminDb().from('lead_settings').update(update).eq('id', 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
