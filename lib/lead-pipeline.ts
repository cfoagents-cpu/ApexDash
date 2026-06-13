import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

// ── Admin DB ──────────────────────────────────────────────────────────────────
export function adminDb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

// ── Auth ──────────────────────────────────────────────────────────────────────
const OWNER_EMAIL = 'jaxson@getfieldmetrics.com';

/** Private-section auth (PRIVATE_PASSWORD token) */
export function isAuthorized(req: Request): boolean {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim();
  return !!token && token === process.env.PRIVATE_PASSWORD;
}

/** Dashboard auth (Supabase JWT — only allows the owner email) */
export async function isOwner(req: Request): Promise<boolean> {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim();
  if (!token) return false;
  const { data: { user } } = await adminDb().auth.getUser(token);
  return user?.email === OWNER_EMAIL;
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface LeadSettings {
  id: number;
  target_states: string[];
  vertical_keywords: string[];
  size_min: number;
  size_max: number;
  sweet_spot_min: number;
  sweet_spot_max: number;
  allowed_titles: string[];
  batch_size: number;
  google_cursor: { metro_index: number; page_token: string | null };
  apollo_cursor: { page: number };
}

export interface RawLead {
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  email_status: 'verified' | 'unverified' | 'none';
  phone: string;
  company: string;
  domain: string;
  employee_count: number | null;
  website: string;
  google_rating: number | null;
  review_count: number | null;
  city: string;
  state: string;
  linkedin_url: string;
  source: 'apollo' | 'google_places';
}

export interface ScoredLead extends RawLead {
  score: number;
  tier: 'A' | 'B' | 'C';
}

export type DropReason = 'not_hvac' | 'wrong_geo' | 'too_large' | 'wrong_title' | 'chain' | 'generic_email' | 'no_contact' | 'duplicate';

// ── Metros ────────────────────────────────────────────────────────────────────
export const METROS = [
  { city: 'Los Angeles', state: 'CA' },
  { city: 'San Diego', state: 'CA' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'San Jose', state: 'CA' },
  { city: 'Sacramento', state: 'CA' },
  { city: 'Fresno', state: 'CA' },
  { city: 'Long Beach', state: 'CA' },
  { city: 'Oakland', state: 'CA' },
  { city: 'Bakersfield', state: 'CA' },
  { city: 'Riverside', state: 'CA' },
  { city: 'Anaheim', state: 'CA' },
  { city: 'Irvine', state: 'CA' },
  { city: 'Stockton', state: 'CA' },
  { city: 'Modesto', state: 'CA' },
  { city: 'Honolulu', state: 'HI' },
  { city: 'Hilo', state: 'HI' },
  { city: 'Pearl City', state: 'HI' },
  { city: 'Kailua', state: 'HI' },
];

// ── Negative-filter constants ─────────────────────────────────────────────────
const CHAIN_KEYWORDS = [
  'one hour air', 'aire serv', 'service experts', 'goettl', 'nexgen',
  'service champions', 'cool today', "parker & sons", 'coolray', 'rescue air',
  'american home shield', 'ars rescue rooter', 'comfort systems usa',
  'sears home', 'john moore', 'abacus', 'mister softee', 'global comfort',
];

const GENERIC_EMAIL_PREFIXES = new Set([
  'info', 'contact', 'admin', 'support', 'hello', 'office',
  'service', 'dispatch', 'sales', 'noreply', 'no-reply', 'team', 'help', 'mail',
]);

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico', '.bmp']);

// ── Helpers ───────────────────────────────────────────────────────────────────
export function extractDomain(url: string): string {
  if (!url) return '';
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, '').toLowerCase();
  } catch { return ''; }
}

export function emailDomain(email: string): string {
  return (email.split('@')[1] ?? '').toLowerCase();
}

function isGenericEmail(email: string): boolean {
  return GENERIC_EMAIL_PREFIXES.has((email.split('@')[0] ?? '').toLowerCase());
}

function isImageLike(s: string): boolean {
  const ext = '.' + (s.split('.').pop()?.toLowerCase() ?? '');
  return IMAGE_EXTS.has(ext);
}

export function isChain(company: string): boolean {
  const lower = company.toLowerCase();
  return CHAIN_KEYWORDS.some(k => lower.includes(k));
}

export function isHvac(company: string, keywords: string[]): boolean {
  const lower = company.toLowerCase();
  return keywords.some(k => lower.includes(k.toLowerCase()));
}

// ── Scoring ───────────────────────────────────────────────────────────────────
export function scoreAndTier(lead: RawLead, s: LeadSettings): { score: number; tier: 'A' | 'B' | 'C' } {
  let n = 0;

  // Fit 40 pts
  n += 15; // vertical confirmed (already filtered)
  if (s.target_states.includes(lead.state)) n += 10;
  const emp = lead.employee_count ?? 0;
  if (emp >= s.sweet_spot_min && emp <= s.sweet_spot_max) n += 15;
  else if (emp > 0) n += 7;

  // Decision-maker 20 pts
  const t = lead.title.toLowerCase();
  if (['owner', 'co-owner', 'president', 'founder', 'proprietor'].some(x => t.includes(x))) n += 20;
  else if (['ceo', 'principal'].some(x => t.includes(x))) n += 14;

  // Reachability 25 pts
  if (lead.email_status === 'verified') n += 12;
  if (lead.phone) n += 7;
  if (lead.linkedin_url) n += 6;

  // Quality 15 pts
  if (lead.website) n += 5;
  if ((lead.review_count ?? 0) >= 20) n += 5;
  if ((lead.google_rating ?? 0) >= 4.3) n += 5;

  const score = Math.min(100, n);
  return { score, tier: score >= 80 ? 'A' : score >= 60 ? 'B' : 'C' };
}

// ── Filter ────────────────────────────────────────────────────────────────────
export function applyFilters(
  leads: RawLead[],
  settings: LeadSettings,
  existingDomains: Set<string>,
  existingEmails: Set<string>,
): { kept: RawLead[]; dropped: Record<DropReason, number> } {
  const dropped: Record<DropReason, number> = {
    not_hvac: 0, wrong_geo: 0, too_large: 0, wrong_title: 0,
    chain: 0, generic_email: 0, no_contact: 0, duplicate: 0,
  };
  const kept: RawLead[] = [];
  const allowedLower = settings.allowed_titles.map(t => t.toLowerCase());

  for (const lead of leads) {
    if (!isHvac(lead.company, settings.vertical_keywords)) { dropped.not_hvac++; continue; }
    if (!settings.target_states.includes(lead.state)) { dropped.wrong_geo++; continue; }
    if (lead.employee_count && lead.employee_count > settings.size_max) { dropped.too_large++; continue; }
    if (isChain(lead.company)) { dropped.chain++; continue; }

    const t = lead.title.toLowerCase();
    if (t && !allowedLower.some(x => t.includes(x))) { dropped.wrong_title++; continue; }
    if (lead.email && isGenericEmail(lead.email) && !lead.phone) { dropped.generic_email++; continue; }
    if (!lead.email && !lead.phone) { dropped.no_contact++; continue; }

    const dom = lead.domain || emailDomain(lead.email);
    const em = lead.email.toLowerCase();
    if ((dom && existingDomains.has(dom)) || (em && existingEmails.has(em))) {
      dropped.duplicate++; continue;
    }

    // Add to seen sets so intra-batch dupes are also caught
    if (dom) existingDomains.add(dom);
    if (em) existingEmails.add(em);
    kept.push(lead);
  }

  return { kept, dropped };
}

// ── Website scraping ──────────────────────────────────────────────────────────
async function scrapeContact(url: string): Promise<{ email: string; linkedin: string }> {
  const result = { email: '', linkedin: '' };
  if (!url) return result;
  const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1)';

  for (const target of [url, url.replace(/\/$/, '') + '/contact']) {
    try {
      const res = await fetch(target, {
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) continue;
      const html = await res.text();
      const $ = cheerio.load(html);

      $('a[href^="mailto:"]').each((_, el) => {
        if (result.email) return;
        const em = ($(el).attr('href') ?? '').replace('mailto:', '').split('?')[0].trim();
        if (em && em.includes('@') && !isGenericEmail(em) && !isImageLike(em)) result.email = em;
      });

      if (!result.email) {
        for (const em of html.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) ?? []) {
          if (!isGenericEmail(em) && !isImageLike(em)) { result.email = em; break; }
        }
      }

      if (!result.linkedin) {
        const li = html.match(/https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_%]+/);
        if (li) result.linkedin = li[0];
      }

      if (result.email) break;
    } catch { continue; }
  }

  return result;
}

// ── Google Places batch ───────────────────────────────────────────────────────
export async function fetchGoogleBatch(settings: LeadSettings): Promise<{
  leads: RawLead[];
  nextCursor: LeadSettings['google_cursor'];
  metroLabel: string;
}> {
  const googleKey = process.env.GOOGLE_PLACES_API_KEY ?? '';
  if (!googleKey) return { leads: [], nextCursor: settings.google_cursor, metroLabel: '' };

  const cur = settings.google_cursor;
  const metro = METROS[cur.metro_index % METROS.length];
  const metroLabel = `${metro.city}, ${metro.state}`;

  let placeResults: any[] = [];
  let nextPageToken: string | null = null;

  try {
    if (cur.page_token) {
      // Google requires 2s delay before using page token; we accept it may fail
      await new Promise(r => setTimeout(r, 2000));
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${cur.page_token}&key=${googleKey}`
      );
      const data: any = await res.json();
      if (data.status === 'OK') { placeResults = data.results ?? []; nextPageToken = data.next_page_token ?? null; }
    } else {
      const q = encodeURIComponent(`HVAC contractor heating air conditioning ${metroLabel}`);
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${q}&key=${googleKey}`);
      const data: any = await res.json();
      if (data.status === 'OK') { placeResults = data.results ?? []; nextPageToken = data.next_page_token ?? null; }
    }
  } catch { /* network error, return empty */ }

  // Fetch details in parallel (cap to batch_size)
  const batch = placeResults.slice(0, settings.batch_size);
  const detailed = await Promise.allSettled(
    batch.map(async (place: any) => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_phone_number,website,rating,user_ratings_total,business_status&key=${googleKey}`
        );
        const d: any = await res.json();
        return { place, detail: d.result ?? {} };
      } catch { return null; }
    })
  );

  // Scrape websites in parallel
  const toScrape: { place: any; detail: any }[] = [];
  for (const r of detailed) {
    if (r.status === 'fulfilled' && r.value) toScrape.push(r.value);
  }

  const scraped = await Promise.allSettled(
    toScrape.map(async ({ place, detail }) => {
      const website = (detail.website ?? '').trim();
      const contact = await scrapeContact(website);
      return { place, detail, website, contact };
    })
  );

  const leads: RawLead[] = [];
  for (const r of scraped) {
    if (r.status !== 'fulfilled') continue;
    const { place, detail, website, contact } = r.value;
    if (detail.business_status === 'CLOSED_PERMANENTLY') continue;
    if (isChain(place.name ?? '')) continue;
    if ((place.user_ratings_total ?? 0) < 3) continue;

    leads.push({
      first_name: '',
      last_name: '',
      title: 'Owner',
      email: contact.email,
      email_status: contact.email ? 'unverified' : 'none',
      phone: detail.formatted_phone_number ?? '',
      company: place.name ?? '',
      domain: website ? extractDomain(website) : '',
      employee_count: null,
      website,
      google_rating: place.rating ?? null,
      review_count: place.user_ratings_total ?? null,
      city: metro.city,
      state: metro.state,
      linkedin_url: contact.linkedin,
      source: 'google_places',
    });
  }

  // Advance cursor
  const nextCursor: LeadSettings['google_cursor'] = nextPageToken
    ? { metro_index: cur.metro_index, page_token: nextPageToken }
    : { metro_index: (cur.metro_index + 1) % METROS.length, page_token: null };

  return { leads, nextCursor, metroLabel };
}

// ── Apollo batch ──────────────────────────────────────────────────────────────
export async function fetchApolloBatch(settings: LeadSettings): Promise<{
  leads: RawLead[];
  nextCursor: LeadSettings['apollo_cursor'];
}> {
  const apolloKey = process.env.APOLLO_API_KEY ?? '';
  if (!apolloKey) return { leads: [], nextCursor: settings.apollo_cursor };

  const { page } = settings.apollo_cursor;
  try {
    const res = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
      body: JSON.stringify({
        api_key: apolloKey,
        q_organization_keyword_tags: settings.vertical_keywords.map(k => k.toLowerCase()),
        person_titles: settings.allowed_titles,
        organization_locations: settings.target_states.map(s =>
          s === 'CA' ? 'California, United States' : 'Hawaii, United States'
        ),
        organization_num_employees_ranges: ['1,10', '11,20', '21,50'],
        contact_email_status: ['verified'],
        page,
        per_page: settings.batch_size,
      }),
    });
    if (!res.ok) return { leads: [], nextCursor: settings.apollo_cursor };

    const data: any = await res.json();
    const people: any[] = data.people ?? [];
    const totalPages = Math.ceil((data.pagination?.total_entries ?? 0) / settings.batch_size);

    const leads: RawLead[] = people.map((p: any) => {
      const org = p.organization ?? {};
      const website = (org.website_url ?? '').trim();
      const email = (p.email ?? '').trim();
      return {
        first_name: p.first_name ?? '',
        last_name: p.last_name ?? '',
        title: p.title ?? '',
        email,
        email_status: p.email_status === 'verified' ? 'verified' : (email ? 'unverified' : 'none'),
        phone: p.sanitized_phone ?? p.phone_numbers?.[0]?.sanitized_number ?? '',
        company: org.name ?? p.organization_name ?? '',
        domain: website ? extractDomain(website) : emailDomain(email),
        employee_count: org.estimated_num_employees ?? null,
        website,
        google_rating: null,
        review_count: null,
        city: p.city ?? org.city ?? '',
        state: p.state ?? org.state ?? '',
        linkedin_url: p.linkedin_url ?? '',
        source: 'apollo' as const,
      };
    });

    const nextPage = page >= totalPages ? 1 : page + 1;
    return { leads, nextCursor: { page: nextPage } };
  } catch {
    return { leads: [], nextCursor: settings.apollo_cursor };
  }
}

// ── Load settings ─────────────────────────────────────────────────────────────
export async function loadSettings(db: ReturnType<typeof adminDb>): Promise<LeadSettings | null> {
  const { data } = await db.from('lead_settings').select('*').eq('id', 1).single();
  return data ?? null;
}

// ── Dedup set ─────────────────────────────────────────────────────────────────
export async function getExistingDedup(db: ReturnType<typeof adminDb>): Promise<{
  domains: Set<string>;
  emails: Set<string>;
}> {
  const domains = new Set<string>();
  const emails = new Set<string>();

  const [{ data: leads }, { data: biz }] = await Promise.all([
    db.from('leads').select('email, domain').neq('status', 'rejected'),
    db.from('businesses').select('email'),
  ]);

  for (const r of leads ?? []) {
    if (r.domain) domains.add(r.domain);
    if (r.email) {
      emails.add(r.email.toLowerCase());
      const d = emailDomain(r.email);
      if (d) domains.add(d);
    }
  }
  // Skip any domain that belongs to an existing paying customer
  for (const r of biz ?? []) {
    if (r.email) {
      const d = emailDomain(r.email);
      if (d) domains.add(d);
    }
  }

  return { domains, emails };
}

// ── Insert leads ──────────────────────────────────────────────────────────────
export async function insertLeads(db: ReturnType<typeof adminDb>, leads: ScoredLead[]): Promise<number> {
  if (!leads.length) return 0;
  const rows = leads.map(l => ({
    score: l.score, tier: l.tier,
    first_name: l.first_name, last_name: l.last_name, title: l.title,
    email: l.email, email_status: l.email_status, phone: l.phone,
    company: l.company, domain: l.domain, employee_count: l.employee_count,
    website: l.website, google_rating: l.google_rating, review_count: l.review_count,
    city: l.city, state: l.state, linkedin_url: l.linkedin_url,
    source: l.source, status: 'new',
  }));
  const { error, count } = await db.from('leads').insert(rows, { count: 'exact' });
  if (error) console.error('[lead-pipeline] insert error:', error.message);
  return error ? 0 : (count ?? rows.length);
}

// ── Log run ───────────────────────────────────────────────────────────────────
export async function logRun(db: ReturnType<typeof adminDb>, run: {
  sources: string[];
  found: number;
  kept: number;
  added: number;
  drop_breakdown: Record<string, number>;
  tier_breakdown: Record<string, number>;
}) {
  await db.from('lead_runs').insert(run);
}

// ── Update cursors ────────────────────────────────────────────────────────────
export async function updateCursors(db: ReturnType<typeof adminDb>, update: {
  google_cursor?: LeadSettings['google_cursor'];
  apollo_cursor?: LeadSettings['apollo_cursor'];
}) {
  await db.from('lead_settings').update({ ...update, updated_at: new Date().toISOString() }).eq('id', 1);
}
