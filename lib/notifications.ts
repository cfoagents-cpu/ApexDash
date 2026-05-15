export type NotificationTier = 1 | 2 | 3 | 4;

export interface AppNotification {
  id: string;
  tier: NotificationTier;
  title: string;
  description: string;
  what: string;
  why: string;
  action: string;
  route: string;
  time: string;
}

export const notifications: AppNotification[] = [
  // ── Tier 1: Urgent — Act Today ──────────────────────────────────────────
  {
    id: 'n1',
    tier: 1,
    title: '2-Star Review on Google',
    description: 'Frank Simmons — "Cancelled last minute, very unprofessional."',
    what: 'A new 2-star review was posted on Google by Frank Simmons at 7:42 AM today.',
    why: 'Reviews under 3 stars hurt your Google ranking and scare off new customers. Owners who respond within 24 hours win back roughly 1 in 3 unhappy customers.',
    action: 'Respond to the review professionally. Then call Frank directly — a rebook offer or refund can often flip a 2-star into a 4-star update.',
    route: '/dashboard/customers',
    time: 'Just now',
  },
  {
    id: 'n2',
    tier: 1,
    title: 'Invoice INV-1004 — 31 Days Overdue',
    description: 'Diana Flores · $180 · Pest Control',
    what: 'INV-1004 for Diana Flores ($180) crossed the 30-day mark with no payment or response.',
    why: 'Collection rates drop sharply after 30 days. At 60 days recovery becomes expensive or impossible — this is the cheapest window to collect.',
    action: 'Call Diana today at (555) 890-1234. Offer a payment plan if needed and document the conversation.',
    route: '/dashboard/revenue',
    time: '2h ago',
  },
  {
    id: 'n3',
    tier: 1,
    title: 'Revenue Pacing 16% Below Last May',
    description: 'MTD $47,400 · Same point last May: $56,300',
    what: 'With 11 days of May complete, month-to-date revenue is tracking 16% behind the same point last year.',
    why: 'You still have 19 days to close the ~$8,900 gap, but the window is closing. At current daily pace you will miss last May\'s total.',
    action: 'Pull open estimates from the last 2 weeks and follow up today. Prioritize HVAC and AC installs — your highest-ticket service.',
    route: '/dashboard/revenue',
    time: 'Today',
  },

  // ── Tier 2: This Week ────────────────────────────────────────────────────
  {
    id: 'n4',
    tier: 2,
    title: 'Kyle Murphy — Callback Rate at 12%',
    description: '3 callbacks on 25 jobs · Team average: 5.8%',
    what: 'Kyle Murphy\'s callback rate hit 12% over the last 14 days — more than double the team average of 5.8%.',
    why: 'Each callback costs roughly $180 in lost labor and raises the chance of a bad review. Two consecutive weeks at this level triggers a formal flag.',
    action: 'Pull the notes on Kyle\'s 3 callback jobs. Look for a pattern in service type or part used, then schedule a 15-minute coaching call this week.',
    route: '/dashboard/operations',
    time: '2 days ago',
  },
  {
    id: 'n5',
    tier: 2,
    title: 'Close Rate Dropped to 51% This Week',
    description: 'Down from 68% trailing average · ~$4,200 in unbooked work',
    what: 'This week\'s estimate close rate is 51%, down 17 points from the 8-week trailing average of 68%.',
    why: 'At current estimate volume, every 1-point drop costs roughly $240 per week. The current 17-point gap is about $4,200 in unbooked revenue.',
    action: 'Export this week\'s declined estimates and identify which tech or CSR has the most unbooked jobs. A same-day follow-up call closes 20–30% of declined estimates.',
    route: '/dashboard/sales',
    time: 'Mon 8:00 AM',
  },
  {
    id: 'n6',
    tier: 2,
    title: 'Google Ads Cost-per-Job Up 34%',
    description: '$94/booked job vs. $70 baseline · ~$1,200 extra this month',
    what: 'Google Ads cost-per-booked-job rose from the $70 baseline to $94 over the past 7 days.',
    why: 'At 50 jobs/month from Google, you\'re paying $24 more per job than normal — roughly $1,200 in extra monthly spend for the same results.',
    action: 'Log into Google Ads and check for bid changes, new competitors on your keywords, or ads with dropping Quality Scores.',
    route: '/dashboard/sales',
    time: 'Mon 8:00 AM',
  },

  // ── Tier 3: Monthly Review ───────────────────────────────────────────────
  {
    id: 'n7',
    tier: 3,
    title: 'Margin Compression — 29.4% vs. 32% Avg',
    description: 'Down 2.6 points from 6-month trailing average',
    what: 'May gross margin is currently 29.4%, compared to a 6-month trailing average of 32%.',
    why: 'Each margin point on $91K in monthly revenue is ~$910. Sustained over a year, that\'s $11K+ in leakage — usually traced to discount creep or rising material costs.',
    action: 'Run a discount report for May. Check if a specific technician or service line is driving the compression.',
    route: '/dashboard/revenue',
    time: 'May 1',
  },
  {
    id: 'n8',
    tier: 3,
    title: 'Lead Source Concentration Risk',
    description: 'Google = 58% of all new leads · Up from 48% six months ago',
    what: 'Google (organic + ads) now accounts for 58% of all new customer leads, up from 48% six months ago.',
    why: 'A single Google Business Profile suspension or ad account issue would cut new leads in half overnight. Most owners only discover this after revenue has already fallen.',
    action: 'Allocate 10–15% of next month\'s marketing budget to a second channel. Referral programs and Yelp typically perform best for home services.',
    route: '/dashboard/sales',
    time: 'May 1',
  },

  // ── Tier 4: Wins ─────────────────────────────────────────────────────────
  {
    id: 'n9',
    tier: 4,
    title: 'Sarah Chen — Best Month Ever',
    description: '$15,600 revenue · 52 jobs · 94% first-fix rate',
    what: 'Sarah Chen just crossed $15,600 in revenue this month — her personal best and 62% above the team average of $9,625.',
    why: 'Understanding what she is doing differently can lift your entire team. Her 94% first-fix rate and low callback count are both standout numbers worth studying.',
    action: 'Send Sarah a personal message today acknowledging her best month. Ask her to share what\'s working at the next team huddle.',
    route: '/dashboard/operations',
    time: 'Today',
  },
  {
    id: 'n10',
    tier: 4,
    title: 'New 5-Star Review — Robert & Linda Marsh',
    description: '"Sarah was amazing, fixed our AC in under 2 hours!"',
    what: 'The Marshes left a 5-star Google review calling out Sarah Chen by name after today\'s AC installation.',
    why: 'Named-technician reviews are your best recruiting and referral tool. Responding to them also boosts your local SEO ranking.',
    action: 'Reply to the review with a personal thank-you from the owner. Text Sarah to recognize the shoutout.',
    route: '/dashboard/customers',
    time: '3h ago',
  },
];
