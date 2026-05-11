# CPA Otene and Associates LLP — Deployment Guide

> **⚠️ Deploying on cPanel?** See **[DEPLOYMENT-CPANEL.md](./DEPLOYMENT-CPANEL.md)** for the full step-by-step cPanel / Phusion Passenger guide. The instructions below are for Vercel deployments.

## Stack Overview
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Email**: Resend (transactional + newsletters)
- **Hosting**: Vercel (recommended) or any Node.js host
- **Domain**: cpaotene.co.ke (or your preferred domain)

---

## Step 1: Supabase Setup

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Name: `cpa-otene-production`
3. Database Password: Generate a strong password and save it
4. Region: `East Asia (Singapore)` (closest to Kenya)

### 1.2 Run Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase/schema.sql`
3. Paste and click **Run**
4. Verify tables were created in **Table Editor**

### 1.3 Create Storage Buckets
Go to **Storage** → Create buckets:
```
career-applications   (private)
blog-images           (public)
resources             (public)
team-photos           (public)
```

### 1.4 Get Your Keys
Go to **Settings** → **API**:
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role` → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Never expose this publicly

---

## Step 2: Resend Setup

### 2.1 Create Account
1. Go to [resend.com](https://resend.com) → Sign up
2. Go to **API Keys** → Create API Key
3. Copy key → `RESEND_API_KEY`

### 2.2 Verify Your Domain
1. Go to **Domains** → Add Domain → `cpaotene.co.ke`
2. Add the DNS records to your domain registrar (Safaricom, Kenya Network, etc.):
   - SPF record
   - DKIM record
   - DMARC record
3. Wait for verification (usually 24–48 hours)

### 2.3 Set From Email
- `RESEND_FROM_EMAIL=noreply@cpaotene.co.ke`
- `RESEND_FROM_NAME=CPA Otene and Associates LLP`

---

## Step 3: Local Development

```bash
# 1. Install Node.js 20+ (https://nodejs.org)

# 2. Clone / copy the project to your machine
cd cpa-otene-website

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual keys

# 5. Run development server
npm run dev

# 6. Open browser
# http://localhost:3000
```

---

## Step 4: Vercel Deployment

### 4.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 4.2 Deploy
```bash
# From the project root
vercel

# Follow the prompts:
# - Link to your Vercel account
# - Set project name: cpa-otene-website
# - Framework: Next.js (auto-detected)
```

### 4.3 Set Environment Variables in Vercel
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add all variables from `.env.example` with your real values:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | noreply@cpaotene.co.ke |
| `RESEND_FROM_NAME` | CPA Otene and Associates LLP |
| `ADMIN_NOTIFICATION_EMAIL` | info@cpaotene.co.ke |
| `HR_NOTIFICATION_EMAIL` | hr@cpaotene.co.ke |
| `NEXT_PUBLIC_SITE_URL` | https://www.cpaotene.co.ke |

### 4.4 Connect Custom Domain
1. Vercel Project → **Settings** → **Domains**
2. Add `www.cpaotene.co.ke` and `cpaotene.co.ke`
3. Update your DNS records at your domain registrar:
   - A record: `@` → Vercel IP
   - CNAME: `www` → `cname.vercel-dns.com`

### 4.5 Production Deploy
```bash
vercel --prod
```

---

## Step 5: Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Contact form submits and sends emails
- [ ] Database stores form submissions
- [ ] Images load from Supabase Storage
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt correct at `/robots.txt`
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Google Search Console: submit sitemap
- [ ] Test mobile responsiveness
- [ ] Test page load speeds (target: 95+ Lighthouse)

---

## Step 6: Admin Dashboard Access

After deployment, set up your admin account:
1. Go to `https://www.cpaotene.co.ke/admin` (once admin routes are implemented)
2. Or manage data directly in Supabase dashboard
3. Go to **Authentication** → **Users** → Invite admin users

---

## Important Security Notes

⚠️ **Never** commit `.env.local` to version control
⚠️ **Never** expose `SUPABASE_SERVICE_ROLE_KEY` publicly
⚠️ Keep Supabase Row Level Security (RLS) **always enabled**
⚠️ Rotate API keys periodically

---

## Support

For technical issues with this codebase, refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
