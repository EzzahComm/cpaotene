# CPA Otene — cPanel Shared Hosting Deployment Guide
## Node.js App via Phusion Passenger

This guide covers deploying the Next.js website on cPanel shared hosting
using the built-in Node.js App Manager (Phusion Passenger).

---

## Prerequisites

Before you start, confirm with your hosting provider:
- ✅ Node.js 20+ is available in cPanel
- ✅ Phusion Passenger is enabled for Node.js
- ✅ SSH access is available (strongly recommended)
- ✅ Your domain is pointed to this hosting account

---

## OVERVIEW — How cPanel Node.js Works

cPanel uses **Phusion Passenger** to run Node.js apps. The flow is:

```
Browser → Apache (cPanel) → Passenger → your Node.js app (server.js)
                                              ↓
                                        Next.js handles routing
```

- Apache handles incoming requests and SSL
- Passenger keeps your Node.js process alive and restarts it if it crashes
- Your app listens on a Passenger-injected PORT (not 80/443)
- The `app.js` file is the Passenger startup file

---

## STEP 1 — Build Locally (on Your Development Machine)

You MUST build the project on your own computer first, then upload the output.
Do NOT try to run `npm run build` on shared hosting — it will time out.

```bash
# 1. Navigate to the project
cd cpa-otene-website

# 2. Install dependencies
npm install

# 3. Create your production environment file
cp .env.example .env.local
# ← Edit .env.local with all your real keys (Supabase, Resend, etc.)

# 4. Build for production
#    This runs `next build` + the postbuild script that prepares
#    the standalone folder automatically
npm run build
```

After a successful build you will see:
```
✅  Standalone folder ready for cPanel upload.
   Upload everything inside: .next/standalone/
```

The folder `.next/standalone/` contains everything needed to run the app.

---

## STEP 2 — What to Upload

After building, upload the **contents** of `.next/standalone/` to your server.

The standalone folder contains:
```
standalone/
├── app.js               ← Passenger startup file
├── server.js            ← Next.js custom server
├── package.json         ← Minimal production package.json
├── node_modules/        ← Only production dependencies (pre-bundled)
├── public/              ← Static assets (images, fonts, favicon)
└── .next/
    ├── static/          ← CSS, JS chunks
    └── server/          ← Server-side rendering files
```

---

## STEP 3 — Upload to cPanel

### Option A: Using cPanel File Manager (Small Sites)

1. Log into cPanel → **File Manager**
2. Navigate to your home directory (e.g., `/home/yourusername/`)
3. Create a folder: `cpa-otene-app` (do NOT put it in `public_html`)
4. Upload the entire contents of `.next/standalone/` into `cpa-otene-app/`
5. Extract any uploaded zip if needed

### Option B: Using FTP/SFTP (Recommended)

Use FileZilla, WinSCP, or Cyberduck:
- Host: your domain or server IP
- Protocol: SFTP
- Username/Password: your cPanel credentials

Upload `.next/standalone/` → `/home/yourusername/cpa-otene-app/`

### Option C: Using SSH + rsync (Fastest)

```bash
# Replace values with your actual server details
rsync -avz --progress \
  .next/standalone/ \
  yourusername@yourserver.co.ke:/home/yourusername/cpa-otene-app/
```

---

## STEP 4 — Set Up Node.js App in cPanel

1. Log into cPanel
2. Go to **Software** → **Setup Node.js App**
3. Click **Create Application**

Fill in the form:

| Field | Value |
|---|---|
| Node.js version | `20.x` (or latest available) |
| Application mode | `Production` |
| Application root | `/home/yourusername/cpa-otene-app` |
| Application URL | `cpaotene.co.ke` (or your domain) |
| Application startup file | `app.js` |

4. Click **Create**
5. cPanel will show you the app's virtual environment path — note it down

---

## STEP 5 — Set Environment Variables in cPanel

In the **Node.js App** panel, find **Environment Variables** and add each one:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yourproject.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` |
| `RESEND_API_KEY` | `re_your_key` |
| `RESEND_FROM_EMAIL` | `noreply@cpaotene.co.ke` |
| `RESEND_FROM_NAME` | `CPA Otene and Associates LLP` |
| `ADMIN_NOTIFICATION_EMAIL` | `info@cpaotene.co.ke` |
| `HR_NOTIFICATION_EMAIL` | `hr@cpaotene.co.ke` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.cpaotene.co.ke` |
| `NEXT_PUBLIC_COMPANY_PHONE` | `+254 700 000 000` |
| `NEXT_PUBLIC_COMPANY_EMAIL` | `info@cpaotene.co.ke` |

⚠️ **Important**: `NEXT_PUBLIC_*` variables are baked into the client bundle at build time. If you change them, you must rebuild and re-upload.

---

## STEP 6 — Configure the Domain (Passenger PassengerApp)

cPanel's Node.js App Manager automatically adds Passenger directives to your
`.htaccess` in `public_html`. However, you also need to ensure:

### 6a. Point your domain to the app

In cPanel → **Node.js App**, click on your app and note the **passenger_base_uri**.

cPanel automatically serves the Node app when the domain matches.

### 6b. SSL Certificate

1. cPanel → **SSL/TLS** → **Let's Encrypt SSL** (or AutoSSL)
2. Issue a certificate for `cpaotene.co.ke` and `www.cpaotene.co.ke`
3. This is free and automatic on most cPanel hosts

### 6c. Force HTTPS (optional — already in public/.htaccess)

If HTTPS redirect isn't working, add to your `public_html/.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## STEP 7 — Start the App

1. In cPanel → **Node.js App**, find your app
2. Click **Start** (or **Restart** if already running)
3. Open your domain in a browser — the site should load

---

## STEP 8 — Supabase Setup (one-time)

1. Go to [supabase.com](https://supabase.com) → create project
2. Go to **SQL Editor** → paste contents of `supabase/schema.sql` → Run
3. Go to **Storage** → create buckets:
   - `career-applications` (private)
   - `blog-images` (public)
   - `resources` (public)
4. Go to **Settings → API** → copy your URL and keys

---

## STEP 9 — Resend Email Setup (one-time)

1. Go to [resend.com](https://resend.com) → sign up
2. **Domains** → Add Domain → `cpaotene.co.ke`
3. Add the DNS records shown (SPF, DKIM, DMARC) in your cPanel DNS Zone Editor:
   - cPanel → **Domains** → **Zone Editor** → your domain
4. Wait for domain verification (24–48 hours)
5. Create an API key → add to your environment variables

---

## Updating the Site (After Changes)

Every time you make code changes:

```bash
# 1. Make your changes
# 2. Rebuild locally
npm run build

# 3. Upload the new standalone/ contents to the server
rsync -avz .next/standalone/ yourusername@server:/home/yourusername/cpa-otene-app/

# 4. Restart the Node.js app in cPanel
#    cPanel → Node.js App → Restart
```

Or via SSH:
```bash
ssh yourusername@yourserver.co.ke
# In cPanel's Node.js virtual env:
cd /home/yourusername/cpa-otene-app
# Touch the restart file (Passenger watches this)
touch tmp/restart.txt
```

---

## Troubleshooting

### Site shows "Application Error"
- Check cPanel → **Logs** → **Error Log** or **Node.js App Logs**
- Usually: missing env variable or wrong startup file path

### 500 Error on API routes
- Verify all Supabase env vars are set correctly in cPanel
- Check the service role key is set (not just the anon key)

### Images not loading
- Confirm the `public/` folder was uploaded inside the app directory
- The postbuild script should handle this automatically

### "Cannot find module 'next'"
- node_modules inside standalone/ should already contain Next.js
- If missing, SSH in and run: `cd /home/yourusername/cpa-otene-app && npm install --production`

### Emails not sending
- Verify Resend domain is verified (check Resend dashboard)
- Confirm `RESEND_API_KEY` is set in environment variables
- Test with a simple API call to `/api/contact`

### App doesn't restart after upload
- Go to cPanel → Node.js App → **Restart**
- Or via SSH: `touch /home/yourusername/cpa-otene-app/tmp/restart.txt`

---

## Server Folder Structure (on cPanel)

After upload, your server should look like:
```
/home/yourusername/
├── cpa-otene-app/          ← Upload standalone/ contents here
│   ├── app.js              ← Passenger startup file
│   ├── server.js
│   ├── package.json
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── .htaccess
│   │   └── images/
│   └── .next/
│       ├── static/
│       └── server/
└── public_html/            ← cPanel web root (Apache)
    └── .htaccess           ← Passenger config (auto-managed by cPanel)
```

---

## Performance Tips for Shared Hosting

1. **Enable caching**: The `.htaccess` in `public/` sets aggressive caching for static assets
2. **Use Supabase CDN**: Store images in Supabase Storage for fast global delivery
3. **Limit API calls**: Cache Supabase queries in memory where appropriate
4. **Compress images**: Use WebP format and keep images under 200KB
5. **Monitor memory**: Shared hosting has memory limits (usually 512MB–2GB). Next.js standalone is efficient.

---

## Node.js Version Requirements

- Minimum: **Node.js 20 LTS**
- Check in cPanel which versions are available
- If only Node 18 is available, change `package.json` engines to `">=18.0.0"` — it will still work

---

## Quick SSH Commands

```bash
# SSH into server
ssh yourusername@cpaotene.co.ke

# Check if app is running
ps aux | grep node

# View error logs
tail -f ~/logs/error_log

# Restart Passenger app
touch ~/cpa-otene-app/tmp/restart.txt

# Check Node.js version
node --version
```
