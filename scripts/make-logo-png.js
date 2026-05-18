// Recreates the CPA OTENE logo as a transparent-background PNG
// Matches: navy CPA serif letters, gold checkmark through A, gold "OTENE &",
// horizontal divider, navy "ASSOCIATES LLP"
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const N = "#1A3A8A"; // navy blue (logo color)
const G = "#C8961A"; // gold/amber

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" width="640" height="220">
  <!-- CPA large serif letters -->
  <!-- C -->
  <text
    x="30" y="165"
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="700"
    font-size="160"
    fill="${N}"
    letter-spacing="-4"
  >C</text>

  <!-- P -->
  <text
    x="132" y="165"
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="700"
    font-size="160"
    fill="${N}"
    letter-spacing="-4"
  >P</text>

  <!-- A (navy) -->
  <text
    x="240" y="165"
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="700"
    font-size="160"
    fill="${N}"
  >A</text>

  <!-- Gold checkmark overlaid on the A -->
  <!-- Swoosh: starts lower-left of A, curves through crossbar area, sweeps up-right -->
  <polyline
    points="258,148  278,175  340,95"
    stroke="${G}"
    stroke-width="18"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- Right side: OTENE & -->
  <text
    x="372" y="110"
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="600"
    font-size="52"
    fill="${G}"
    letter-spacing="1.5"
  >OTENE &amp;</text>

  <!-- Horizontal divider -->
  <line x1="372" y1="122" x2="628" y2="122" stroke="${N}" stroke-width="2.5"/>

  <!-- ASSOCIATES LLP -->
  <text
    x="372" y="170"
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="700"
    font-size="46"
    fill="${N}"
    letter-spacing="2"
  >ASSOCIATES LLP</text>
</svg>`;

const outPath = path.join(__dirname, "../public/logo.png");

sharp(Buffer.from(svg))
  .png()
  .toFile(outPath)
  .then((info) => {
    console.log(`✓ logo.png saved (${info.width}×${info.height}px, ${Math.round(info.size / 1024)}KB)`);
    console.log(`  → ${outPath}`);
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
