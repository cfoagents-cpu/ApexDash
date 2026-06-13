import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isAuthorized } from '@/lib/lead-pipeline';

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = adminDb();
  const url = new URL(req.url);
  const showRejected = url.searchParams.get('rejected') === '1';

  let query = db.from('leads').select('*').order('score', { ascending: false });
  if (!showRejected) query = query.neq('status', 'rejected');

  const { data: leads, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: runs } = await db
    .from('lead_runs')
    .select('*')
    .order('ran_at', { ascending: false })
    .limit(20);

  const { data: settings } = await db.from('lead_settings').select('*').eq('id', 1).single();

  return NextResponse.json({ leads: leads ?? [], runs: runs ?? [], settings });
}
