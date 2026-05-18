/**
 * cPanel Post-Build Script
 *
 * Next.js standalone output doesn't automatically copy public/ and
 * .next/static/ into the standalone folder. This script does that,
 * so you can upload the single `standalone/` folder to cPanel.
 *
 * Run automatically after `npm run build` via the "postbuild" hook.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const STANDALONE = path.join(ROOT, ".next", "standalone");
const PUBLIC_SRC = path.join(ROOT, "public");
const PUBLIC_DEST = path.join(STANDALONE, "public");
const STATIC_SRC = path.join(ROOT, ".next", "static");
const STATIC_DEST = path.join(STANDALONE, ".next", "static");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`  Skipping (not found): ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Skip cPanel-specific steps on Vercel — it manages its own output
if (process.env.VERCEL) {
  console.log("Vercel detected — skipping cPanel post-build.");
  process.exit(0);
}

console.log("\n📦 cPanel Post-Build: Preparing standalone folder...\n");

if (!fs.existsSync(STANDALONE)) {
  console.error("❌  .next/standalone not found. Make sure output: 'standalone' is set in next.config.ts");
  process.exit(1);
}

console.log("  Copying public/ → standalone/public/");
copyDir(PUBLIC_SRC, PUBLIC_DEST);

console.log("  Copying .next/static/ → standalone/.next/static/");
copyDir(STATIC_SRC, STATIC_DEST);

// Also copy server.js and app.js into standalone
console.log("  Copying server.js → standalone/server.js");
fs.copyFileSync(path.join(ROOT, "server.js"), path.join(STANDALONE, "server.js"));

console.log("  Copying app.js → standalone/app.js");
fs.copyFileSync(path.join(ROOT, "app.js"), path.join(STANDALONE, "app.js"));

console.log("\n✅  Standalone folder ready for cPanel upload.");
console.log(`   Upload everything inside: .next/standalone/\n`);
