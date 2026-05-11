# CPA Otene and Associates LLP — Enterprise Website

> Premium enterprise website for Kenya's leading audit, governance, tax, risk, and advisory firm.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom Design System |
| Animations | Framer Motion |
| UI Components | ShadCN/UI + Radix UI |
| Icons | Lucide React |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Email | Resend + React Email |
| Hosting | Vercel |
| Forms | React Hook Form + Zod |

## Project Structure

```
cpa-otene-website/
├── app/
│   ├── (website)/              # Public website routes
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About Us
│   │   ├── services/           # Services index + individual pages
│   │   ├── industries/         # Industries index + individual pages
│   │   ├── insights/           # Insights / Blog
│   │   ├── careers/            # Careers
│   │   └── contact/            # Contact
│   ├── api/                    # API routes
│   │   ├── contact/            # Contact form handler
│   │   ├── newsletter/         # Newsletter subscription
│   │   └── careers/            # Career applications
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles + design tokens
├── components/
│   ├── layout/                 # Header, Footer
│   ├── home/                   # Homepage sections
│   ├── about/                  # About page components
│   ├── services/               # Service components
│   ├── industries/             # Industry components
│   ├── insights/               # Blog/insights components
│   ├── careers/                # Careers components
│   ├── contact/                # Contact components
│   └── shared/                 # Shared components (PageHero, etc.)
├── lib/
│   ├── supabase/               # Supabase clients (browser + server)
│   └── utils.ts                # Utility functions
├── supabase/
│   └── schema.sql              # Full PostgreSQL schema with RLS
├── .env.example                # Environment variables template
├── DEPLOYMENT.md               # Full deployment guide
├── tailwind.config.ts          # Tailwind configuration + brand tokens
├── next.config.ts              # Next.js configuration
└── package.json                # Dependencies
```

## Brand Colors

| Name | Hex | Usage |
|---|---|---|
| Deep Navy | `#0B1F3A` | Primary brand, hero backgrounds |
| Royal Blue | `#123D6B` | Secondary accents, hover states |
| Gold | `#C8A24D` | CTAs, accents, premium elements |
| Charcoal | `#1B1F24` | Body text |
| Light Gray | `#F5F7FA` | Section backgrounds |

## Getting Started

See **DEPLOYMENT.md** for full setup and deployment instructions.

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your keys
npm run dev
```

## Key Pages

| Page | Path | Description |
|---|---|---|
| Homepage | `/` | Hero, stats, services, testimonials, insights |
| About | `/about` | History, mission, values, leadership |
| Services | `/services` | All 12 service lines |
| Service Detail | `/services/[slug]` | Individual service pages |
| Industries | `/industries` | 12 industry sectors |
| Insights | `/insights` | Thought leadership blog |
| Careers | `/careers` | Open positions + applications |
| Contact | `/contact` | Contact form + office locations |

## SEO Strategy

Optimised for:
- `audit firms Kenya`
- `best audit firms Nairobi`
- `governance advisory Kenya`
- `tax consultants Kenya`
- `IFRS advisory Kenya`
- `ESG consultants East Africa`
- `CPA firms Kenya`

Features: sitemap, robots.txt, Open Graph, Twitter cards, structured data.
