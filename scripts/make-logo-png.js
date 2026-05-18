// Recreates the CPA OTENE logo as a transparent-background PNG
// Matches: navy CPA serif letters, gold checkmark through A, gold "OTENE &",
// horizontal divider, navy "ASSOCIATES LLP"
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const N = "#1A3A8A"; // navy blue (logo color)
const G = "#C8961A"; // gold/amber

// Wider canvas so "ASSOCIATES LLP" never clips
const W = 820, H = 230;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <!-- CPA large serif letters -->
  <text x="15"  y="175" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="150" fill="${N}" letter-spacing="-4">C</text>
  <text x="108" y="175" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="150" fill="${N}" letter-spacing="-4">P</text>
  <text x="200" y="175" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="150" fill="${N}">A</text>

  <!-- Gold checkmark through the A -->
  <polyline
    points="218,152  240,182  318,98"
    stroke="${G}" stroke-width="17" fill="none"
    stroke-linecap="round" stroke-linejoin="round"
  />

  <!-- Right column: OTENE & -->
  <text x="320" y="108"
    font-family="Georgia,'Times New Roman',serif"
    font-weight="600" font-size="50" fill="${G}" letter-spacing="2"
  >OTENE &amp;</text>

  <!-- Horizontal divider -->
  <line x1="320" y1="122" x2="815" y2="122" stroke="${N}" stroke-width="2.5"/>

  <!-- ASSOCIATES LLP — reduced size + tight tracking to stay within canvas -->
  <text x="320" y="175"
    font-family="Georgia,'Times New Roman',serif"
    font-weight="700" font-size="40" fill="${N}" letter-spacing="1.5"
  >ASSOCIATES LLP</text>
</svg>`;

const outPath = path.join(__dirname, "../public/logo.png");

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(outPath)
  .then((info) => {
    console.log(`✓ logo.png saved (${info.width}×${info.height}px, ${Math.round(info.size / 1024)}KB)`);
    console.log(`  → ${outPath}`);
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
