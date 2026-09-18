# GAR 2025 — Resilience Pays · Policy Intelligence Dashboard

A multi-stakeholder policy dashboard transforming the **UNDRR Global Assessment Report 2025** (253 pages) into actionable intelligence for policymakers. Includes a 3D world risk map visualizing all key stats in one view.

> **Source report**: UNDRR (2025). *Global Assessment Report on Disaster Risk Reduction 2025: Resilience Pays — Financing and Investing for our Future.* United Nations Office for Disaster Risk Reduction, Geneva. Licensed under CC BY-NC 3.0 IGO.

---

## Live Demo

After deploying to Vercel (see below), your dashboard will be live at:
`https://gar2025-resilience-dashboard.vercel.app` (or your custom name)

## Features

### 📊 Policy Dashboard Tab
11 sections covering the full GAR 2025 report:
1. **Hero** — $2.3T true annual cost vs $202B direct losses (the "iceberg")
2. **True Cost Iceberg** — "missing millions" hidden below the waterline
3. **Big Five Hazards** — 95% of losses from storms, floods, earthquakes, droughts, extreme heat
4. **Three Negative Spirals** — risk-creation / risk-transfer / response-repeat
5. **Sendai Framework Progress** — 7 targets (A–G) with status, trends, caveats
6. **Vulnerable Countries** — LDCs / LLDCs / SIDS disparity cards
7. **Future Risk & ROI** — -19% income decline by 2050 + BCR 2:1 to 10:1+
8. **Funding Gap** — Only 1% of ODA is DRR; 3.3% of humanitarian aid is prevention
9. **Six Action Areas** — Chapter 7 conclusion with policy actions per area
10. **Stakeholder Pathways** — 5 policymaker lenses (Finance Minister, DRR Agency, Insurer, MDB, Humanitarian)
11. **Footer** — UNDRR attribution + citation

### 🌍 World Risk Map Tab (3D Visualization)
- **geo3D world map** with 217 countries from real GeoJSON
- **3D bars rising from each country** — height & color driven by selected metric
- **6 switchable metrics**, all in one map:
  - Direct Losses ($B/yr)
  - % of GDP
  - Mortality per 100k
  - People Affected per 100k
  - MHEWS Coverage (%)
  - Flood Δ 2050 (% change under RCP8.5)
- **55+ country data points** with all 6 metrics each
- **Group filter** (All / LDC / LLDC / SIDS / G20 / OECD)
- **3D Bars on/off** toggle (falls back to scatter3D)
- **Side panel** with gradient legend, top-5 ranking, global snapshot
- **Drag to rotate**, scroll to zoom, right-drag to pan

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Charts**: Recharts (dashboard) + ECharts GL (3D map)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Local Development

### Prerequisites

- **Node.js 18.17+** (recommend 20+)
- **Bun** (preferred) or npm/pnpm/yarn

### Install & Run

```bash
# Install dependencies
bun install
# or: npm install

# Start dev server
bun run dev
# or: npm run dev

# Open in browser
# http://localhost:3000
```

### Build for Production

```bash
bun run build
bun run start
```

## Deploy to Vercel (Recommended, 2 minutes, free)

### Option A: Direct GitHub import (recommended)

1. **Push this project to GitHub** (see next section)
2. Go to **https://vercel.com/new**
3. Sign in with GitHub
4. Click **Import Git Repository** → select this repo
5. Vercel auto-detects Next.js — defaults are perfect, just click **Deploy**
6. Wait ~2 minutes — live at `https://your-repo-name.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project folder
vercel

# Deploy to production
vercel --prod
```

## Push to GitHub

```bash
# Initialize git (if not already)
git init
git branch -M main

# Add files
git add .
git commit -m "Initial commit: GAR 2025 Policy Intelligence Dashboard"

# Create repo on GitHub first (https://github.com/new), then:
git remote add origin https://github.com/YOUR-USERNAME/gar2025-resilience-dashboard.git
git push -u origin main
```

**Authentication**: GitHub no longer accepts passwords for git push. Use one of:
- **Personal Access Token** (https://github.com/settings/tokens, scope: `repo`) — paste as password
- **SSH**: `git remote set-url origin git@github.com:YOUR-USERNAME/gar2025-resilience-dashboard.git`
- **GitHub CLI**: `gh auth login` then `gh repo create gar2025-resilience-dashboard --public --source=. --push`

## Project Structure

```
.
├── public/
│   ├── geo/
│   │   └── world.json              # World map GeoJSON (217 countries)
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── globals.css             # Tailwind + custom utilities
│   │   ├── layout.tsx              # Root layout + metadata
│   │   └── page.tsx                 # Main page (tab container)
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── header.tsx           # Sticky nav with section links
│   │   │   ├── hero.tsx             # Hero + KPI cards + iceberg
│   │   │   ├── true-cost.tsx        # Direct vs indirect losses visual
│   │   │   ├── big-five.tsx         # Hazards donut + bar + cards
│   │   │   ├── spirals.tsx          # Three negative spirals
│   │   │   ├── sendai.tsx           # 7 Sendai targets + trend charts
│   │   │   ├── vulnerable.tsx       # LDC/LLDC/SIDS disparity
│   │   │   ├── future-roi.tsx       # 2050 projections + BCR cards
│   │   │   ├── funding-gap.tsx     # ODA + humanitarian pies
│   │   │   ├── action-areas.tsx     # Six action areas + CTA
│   │   │   ├── stakeholders.tsx     # 5 stakeholder lenses + matrix
│   │   │   ├── world-map.tsx        # 3D ECharts world map
│   │   │   ├── tabs-container.tsx   # Top-level tab system
│   │   │   └── footer.tsx
│   │   └── ui/                     # shadcn/ui components
│   ├── lib/
│   │   ├── gar-data.ts             # ALL extracted GAR 2025 data
│   │   └── utils.ts
│   └── hooks/
├── prisma/
│   └── schema.prisma               # SQLite schema (not used by dashboard)
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── components.json
```

## Data Sources

All data is sourced from UNDRR GAR 2025 and stored in `src/lib/gar-data.ts`:

| Section | Source |
|---------|--------|
| Direct losses, % of GDP by subregion | GAR 2025 Ch.4 Figure 29 (UNDRR/CRED/UCLouvain 2025; World Bank 2025) |
| Mortality per 100k (LDC/LLDC/SIDS) | GAR 2025 Ch.1 Figure 10 + Box 1 |
| MHEWS coverage | GAR 2025 Ch.1 Figure 13 (Target G) |
| Future flood risk to 2050 | GAR 2025 Ch.5 Map 36 (RCP8.5) |
| Future storms/cyclones | GAR 2025 Ch.5 (Tropical cyclone risk) |
| Sovereign credit rating impacts | GAR 2025 Ch.6 Figure 53–54 |
| Three spirals | GAR 2025 Ch.6 |
| Six action areas | GAR 2025 Ch.7 (Conclusion) |
| BCR / ROI of resilience | GAR 2025 Ch.5 + Ch.7 |

Where country-level data is not reported in the source, subregional averages have been used.

## Methodology Notes

- **Bar heights & colors** on the world map are scaled to each metric's range
- **Country coordinates** are approximate centroids
- **3D visualization** uses ECharts GL `bar3D` on a `geo3D` base
- **Lazy-loaded** the map (echarts-gl is ~1MB) so the dashboard tab stays snappy

## License

- **Source report**: © 2025 UNDRR. Licensed under [CC BY-NC 3.0 IGO](https://creativecommons.org/licenses/by-nc/3.0/igo/legalcode)
- **Dashboard code**: This is an analytical derivative, not an official UNDRR product. You may reuse the code under the same CC BY-NC 3.0 IGO license.

## Citation

```bibtex
@misc{undrr_gar2025,
  title  = {Global Assessment Report on Disaster Risk Reduction 2025: Resilience Pays — Financing and Investing for our Future},
  author = {{United Nations Office for Disaster Risk Reduction}},
  year   = {2025},
  url    = {https://www.undrr.org/gar}
}
```
