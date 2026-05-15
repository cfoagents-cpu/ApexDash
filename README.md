# Apex Home Services — Business Dashboard

A clean, professional dashboard that shows home service business owners their most important numbers in one place.

## How to Run the Project

### First-time setup (do this once)
```bash
cd apex-dashboard
npm install
```

### Start the dashboard
```bash
npm run dev
```

Then open your browser and go to: **http://localhost:3000**

The dashboard will automatically reload whenever you make changes.

### Stop the dashboard
Press `Ctrl + C` in the terminal.

---

## What Each Folder Does

| Folder / File | What it is |
|---|---|
| `app/` | Every page of the website lives here |
| `app/dashboard/page.tsx` | The Overview (home) page |
| `app/dashboard/revenue/` | The Revenue page |
| `app/dashboard/customers/` | The Customers page |
| `app/dashboard/operations/` | The Operations page |
| `app/dashboard/sales/` | The Sales page |
| `app/dashboard/layout.tsx` | The sidebar + top bar that wrap every page |
| `components/` | Reusable building blocks (cards, charts, tables) |
| `components/charts/` | All the graphs (line, bar, pie) |
| `lib/mockData.ts` | All the fake sample data for Apex Home Services |
| `lib/formatters.ts` | Helper functions for showing money, percent, etc. |
| `types/index.ts` | TypeScript type definitions |

---

## How to Swap Fake Data for Real Data

All the sample numbers live in **one file**: `lib/mockData.ts`

To connect real data from your job management software (e.g., ServiceTitan, Jobber, Housecall Pro):

1. **Replace the `summaryStats` object** with values fetched from your software's API
2. **Replace `recentJobs`** with your actual job records
3. **Replace `technicians`** with your actual technician records
4. **Replace `leadSources`** with your actual marketing channel data

Each section of `mockData.ts` is labeled with a comment (e.g., `// ─── Revenue ───`) to make it easy to find.

### Example: Pulling real revenue

Instead of:
```ts
export const summaryStats = {
  totalRevenueMTD: 91200,
  ...
}
```

You would do:
```ts
const stats = await fetch('https://your-api.com/stats').then(r => r.json());

export const summaryStats = {
  totalRevenueMTD: stats.revenue.monthToDate,
  ...
}
```

---

## Pages & What They Show

| Page | URL | Key metrics |
|---|---|---|
| Overview | `/dashboard` | Revenue, Active Jobs, LTV:CAC, Retention |
| Revenue | `/dashboard/revenue` | Revenue trends, profit margin, overdue invoices |
| Customers | `/dashboard/customers` | LTV, CRR, CAC, repeat rate, reviews |
| Operations | `/dashboard/operations` | Completion rate, utilization, technician performance |
| Sales | `/dashboard/sales` | Lead conversion, close rates, cost per lead |

---

## Tech Stack

- **Next.js 16** — the framework that runs the website
- **TypeScript** — adds type safety to catch bugs early
- **Tailwind CSS** — handles all the styling
- **shadcn/ui** — pre-built components (cards, tables, dropdowns)
- **Recharts** — the charts and graphs
- **Lucide React** — the icons
