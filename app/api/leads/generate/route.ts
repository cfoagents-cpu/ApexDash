import { NextRequest, NextResponse } from 'next/server';
import {
  adminDb, isOwner,
  loadSettings, getExistingDedup,
  fetchGoogleBatch, fetchApolloBatch,
  applyFilters, scoreAndTier,
  insertLeads, logRun, updateCursors,
  type ScoredLead,
} from '@/lib/lead-pipeline';

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  if (!(await isOwner(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = adminDb();
  const settings = await loadSettings(db);
  if (!settings) return NextResponse.json({ error: 'No lead_settings row found' }, { status: 500 });

  const { domains, emails } = await getExistingDedup(db);

  const [googleResult, apolloResult] = await Promise.all([
    fetchGoogleBatch(settings),
    fetchApolloBatch(settings),
  ]);

  const allRaw = [...googleResult.leads, ...apolloResult.leads];
  const sources: string[] = [];
  if (googleResult.leads.length > 0) sources.push(`Google Places (${googleResult.metroLabel})`);
  if (apolloResult.leads.length > 0) sources.push('Apollo');

  const { kept, dropped } = applyFilters(allRaw, settings, domains, emails);

  const scored: ScoredLead[] = kept.map(lead => {
    const { score, tier } = scoreAndTier(lead, settings);
    return { ...lead, score, tier };
  });
  scored.sort((a, b) => b.score - a.score);

  const added = await insertLeads(db, scored);

  const tiers = { A: 0, B: 0, C: 0 };
  for (const l of scored) tiers[l.tier]++;

  await Promise.all([
    updateCursors(db, {
      google_cursor: googleResult.nextCursor,
      apollo_cursor: apolloResult.nextCursor,
    }),
    logRun(db, {
      sources,
      found: allRaw.length,
      kept: kept.length,
      added,
      drop_breakdown: dropped as Record<string, number>,
      tier_breakdown: tiers,
    }),
  ]);

  return NextResponse.json({
    added,
    found: allRaw.length,
    kept: kept.length,
    tiers,
    sources,
    metro: googleResult.metroLabel,
    exhausted: allRaw.length === 0,
    drop_breakdown: dropped,
  });
}
