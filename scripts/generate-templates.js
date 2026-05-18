/**
 * CPA OTENE & ASSOCIATES LLP — Excel Template Generator
 * Generates 6 professional accounting templates with logo and brand styling.
 * Run: node scripts/generate-templates.js
 */

"use strict";

const ExcelJS = require("exceljs");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

/* ─── Brand palette ────────────────────────────────────────────────── */
const N  = "0B1F3A"; // Navy
const R  = "123D6B"; // Royal blue
const G  = "C8A24D"; // Gold
const GL = "F8EDCA"; // Gold light
const W  = "FFFFFF"; // White
const LG = "F5F7FA"; // Light gray
const MG = "E8EDF4"; // Medium gray
const TM = "3D4855"; // Text mid

const OUT = path.join(__dirname, "..", "public", "downloads");
const LOGO_PNG = path.join(__dirname, "..", "public", "logo.png");

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

/* ─── Brand logo PNG (real file or SVG fallback) ───────────────────── */
async function getLogoBuf() {
  if (fs.existsSync(LOGO_PNG)) {
    return fs.readFileSync(LOGO_PNG);
  }
  // Fallback: render an SVG approximation of the logo via sharp
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 90" width="440" height="90">
    <rect width="440" height="90" fill="#FFFFFF"/>
    <text x="8"  y="68" font-family="Georgia,serif" font-weight="700" font-size="66" fill="#0B1F3A">CP</text>
    <text x="108" y="68" font-family="Georgia,serif" font-weight="700" font-size="66" fill="#0B1F3A">A</text>
    <polyline points="115,50 130,65 153,37" stroke="#C8A24D" stroke-width="5.5"
              fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="172" y="36" font-family="Georgia,serif" font-weight="600" font-size="25" fill="#C8A24D">OTENE &amp;</text>
    <line x1="172" y1="44" x2="430" y2="44" stroke="#C8A24D" stroke-width="1.8"/>
    <text x="172" y="71" font-family="Georgia,serif" font-weight="700" font-size="22" fill="#0B1F3A" letter-spacing="1">ASSOCIATES LLP</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/* ─── Shared helpers ───────────────────────────────────────────────── */
function fill(color) { return { type: "pattern", pattern: "solid", fgColor: { argb: `FF${color}` } }; }
function font(bold, size, color = W, name = "Calibri") {
  return { bold, size, color: { argb: `FF${color}` }, name };
}
function border(style = "thin") {
  const s = { style, color: { argb: `FF${MG}` } };
  return { top: s, left: s, bottom: s, right: s };
}
function thick(color = N) {
  const s = { style: "medium", color: { argb: `FF${color}` } };
  return { top: s, left: s, bottom: s, right: s };
}
function centerAlign(wrap = false) { return { horizontal: "center", vertical: "middle", wrapText: wrap }; }
function leftAlign(wrap = false)   { return { horizontal: "left",   vertical: "middle", wrapText: wrap }; }
function rightAlign()              { return { horizontal: "right",  vertical: "middle" }; }

function headerCell(ws, addr, value, bgColor = N, fontColor = W, fontSize = 11, bold = true) {
  const cell = ws.getCell(addr);
  cell.value = value;
  cell.fill  = fill(bgColor);
  cell.font  = font(bold, fontSize, fontColor);
  cell.alignment = centerAlign();
  cell.border = thick(bgColor);
  return cell;
}

function labelCell(ws, addr, value, bgColor = MG, fontColor = N, bold = false) {
  const cell = ws.getCell(addr);
  cell.value = value;
  cell.fill  = fill(bgColor);
  cell.font  = font(bold, 10, fontColor);
  cell.alignment = leftAlign();
  cell.border = border();
  return cell;
}

function dataCell(ws, addr, value = null, numFmt = null) {
  const cell = ws.getCell(addr);
  if (value !== null) cell.value = value;
  cell.fill  = fill(W);
  cell.font  = font(false, 10, "1B1F24");
  cell.alignment = leftAlign();
  cell.border = border();
  if (numFmt) cell.numFmt = numFmt;
  return cell;
}

function moneyCell(ws, addr, value = null, bgColor = W, fontColor = "1B1F24") {
  const cell = ws.getCell(addr);
  if (value !== null) cell.value = value;
  cell.fill  = fill(bgColor);
  cell.font  = font(false, 10, fontColor);
  cell.alignment = rightAlign();
  cell.border = border();
  cell.numFmt = '#,##0.00';
  return cell;
}

function totalCell(ws, addr, formula, bgColor = GL, fontColor = N) {
  const cell = ws.getCell(addr);
  cell.value = { formula };
  cell.fill  = fill(bgColor);
  cell.font  = font(true, 10, fontColor);
  cell.alignment = rightAlign();
  cell.border = thick(G);
  cell.numFmt = '#,##0.00';
  return cell;
}

/* ─── Add logo image to worksheet ─────────────────────────────────── */
async function addLogo(wb, ws, logoBuf, col = 1, row = 1, width = 160, height = 44) {
  const imgId = wb.addImage({ buffer: logoBuf, extension: "png" });
  ws.addImage(imgId, {
    tl: { col: col - 1, row: row - 1 },
    ext: { width, height },
    editAs: "oneCell",
  });
}

/* ─── Standard company banner (rows 1–3) ──────────────────────────── */
async function addBanner(wb, ws, logoBuf, title, subtitle = "") {
  // Row 1 — logo left, company name right
  ws.mergeCells("A1:D2"); ws.getCell("A1").fill = fill(W);
  ws.mergeCells("E1:J2");
  const nameCell = ws.getCell("E1");
  nameCell.value = "CPA OTENE & ASSOCIATES LLP";
  nameCell.fill  = fill(W);
  nameCell.font  = font(true, 14, N, "Calibri");
  nameCell.alignment = rightAlign();

  await addLogo(wb, ws, logoBuf, 1, 1, 180, 48);

  // Row 3 — title banner
  ws.mergeCells("A3:J3");
  const t = ws.getCell("A3");
  t.value     = title;
  t.fill      = fill(N);
  t.font      = font(true, 14, W);
  t.alignment = centerAlign();

  // Row 4 — subtitle / instructions
  if (subtitle) {
    ws.mergeCells("A4:J4");
    const s = ws.getCell("A4");
    s.value     = subtitle;
    s.fill      = fill(G);
    s.font      = font(true, 10, N);
    s.alignment = centerAlign();
  }
}

/* ══════════════════════════════════════════════════════════════════
   1. CASHBOOK TEMPLATE
══════════════════════════════════════════════════════════════════ */
async function createCashbook(logoBuf) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CPA OTENE & ASSOCIATES LLP";
  wb.created = new Date();

  const ws = wb.addWorksheet("Cashbook", {
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1 },
  });

  ws.columns = [
    { width: 13 }, { width: 36 }, { width: 14 }, { width: 16 },
    { width: 16 }, { width: 18 }, { width: 14 }, { width: 12 },
    { width: 12 }, { width: 12 },
  ];
  ws.getRow(1).height = 36;
  ws.getRow(2).height = 18;
  ws.getRow(3).height = 28;
  ws.getRow(4).height = 18;

  await addBanner(wb, ws, logoBuf, "CASHBOOK — DAILY CASH REGISTER",
    "CPA OTENE & ASSOCIATES LLP  |  Nairobi, Kenya  |  Tel: +254 747 515 972  |  info@cpaotene.com");

  // Company/period row
  ws.mergeCells("A5:C5"); labelCell(ws, "A5", "Company / Organisation:", MG, N, true);
  ws.mergeCells("D5:F5"); dataCell(ws, "D5", "");
  ws.mergeCells("G5:H5"); labelCell(ws, "G5", "Period From:", MG, N, true);
  ws.mergeCells("I5:J5"); dataCell(ws, "I5", "", "#,##0"); ws.getCell("I5").numFmt = "DD/MM/YYYY";
  ws.getRow(5).height = 20;

  ws.mergeCells("A6:C6"); labelCell(ws, "A6", "Cashier / Prepared By:", MG, N, true);
  ws.mergeCells("D6:F6"); dataCell(ws, "D6", "");
  ws.mergeCells("G6:H6"); labelCell(ws, "G6", "Period To:", MG, N, true);
  ws.mergeCells("I6:J6"); dataCell(ws, "I6", ""); ws.getCell("I6").numFmt = "DD/MM/YYYY";
  ws.getRow(6).height = 20;

  ws.getRow(7).height = 10; // spacer

  // Column headers
  const cols = ["Date","Narration / Description","Reference No","Cash Receipts (KES)","Cash Payments (KES)","Running Balance (KES)"];
  const hcols = ["A","B","C","D","E","F"];
  ws.mergeCells("A8:A8"); ws.mergeCells("D8:D8"); ws.mergeCells("E8:E8"); ws.mergeCells("F8:F8");
  cols.forEach((c, i) => {
    const cell = ws.getCell(`${hcols[i]}8`);
    cell.value     = c;
    cell.fill      = fill(N);
    cell.font      = font(true, 10, G);
    cell.alignment = centerAlign(true);
    cell.border    = thick(R);
  });
  ws.getRow(8).height = 30;

  // Opening balance row (row 9)
  ws.getRow(9).height = 20;
  const ob = ["A9","B9","C9","D9","E9","F9"];
  labelCell(ws, "A9", "", GL); // date
  const obsLabel = ws.getCell("B9");
  obsLabel.value = "OPENING BALANCE b/f"; obsLabel.fill = fill(GL);
  obsLabel.font  = font(true, 10, N); obsLabel.alignment = leftAlign(); obsLabel.border = thick(G);
  labelCell(ws, "C9", "", GL);
  moneyCell(ws, "D9", 0, GL, N);
  moneyCell(ws, "E9", 0, GL, N);
  moneyCell(ws, "F9", 0, GL, N); // user enters opening balance

  // Data rows 10–39
  for (let r = 10; r <= 39; r++) {
    ws.getRow(r).height = 18;
    dataCell(ws, `A${r}`, ""); ws.getCell(`A${r}`).numFmt = "DD/MM/YYYY";
    dataCell(ws, `B${r}`, "");
    dataCell(ws, `C${r}`, "");
    moneyCell(ws, `D${r}`);
    moneyCell(ws, `E${r}`);
    // Balance = previous balance + cash in - cash out
    const prevF = r === 10 ? "F9" : `F${r - 1}`;
    const balCell = ws.getCell(`F${r}`);
    balCell.value     = { formula: `${prevF}+D${r}-E${r}` };
    balCell.fill      = fill(LG);
    balCell.font      = font(false, 10, N);
    balCell.alignment = rightAlign();
    balCell.border    = border();
    balCell.numFmt    = "#,##0.00";
  }

  ws.getRow(40).height = 22;
  // Totals row
  const tl = ws.getCell("B40");
  tl.value = "TOTALS"; tl.fill = fill(N); tl.font = font(true, 11, G); tl.alignment = centerAlign(); tl.border = thick(N);
  labelCell(ws, "A40", "", N); labelCell(ws, "C40", "", N);
  totalCell(ws, "D40", "SUM(D10:D39)", N, G);
  totalCell(ws, "E40", "SUM(E10:E39)", N, G);
  const closingCell = ws.getCell("F40");
  closingCell.value     = { formula: "F39" };
  closingCell.fill      = fill(G); closingCell.font = font(true, 11, N);
  closingCell.alignment = rightAlign(); closingCell.border = thick(G); closingCell.numFmt = "#,##0.00";

  // Sign-off row
  ws.getRow(42).height = 10;
  ws.mergeCells("A43:C43"); const p = ws.getCell("A43");
  p.value = "Prepared By: ___________________________   Signature: ___________________________";
  p.fill = fill(LG); p.font = font(false, 9, TM); p.alignment = leftAlign();
  ws.mergeCells("D43:F43"); const a = ws.getCell("D43");
  a.value = "Approved By: ___________________________   Date: ___________________________";
  a.fill = fill(LG); a.font = font(false, 9, TM); a.alignment = leftAlign();

  ws.getRow(44).height = 8;
  ws.mergeCells("A45:F45"); const foot = ws.getCell("A45");
  foot.value = "© CPA OTENE & ASSOCIATES LLP — Template for internal use. All figures in Kenya Shillings (KES).";
  foot.fill  = fill(N); foot.font = font(false, 8, G); foot.alignment = centerAlign();

  await wb.xlsx.writeFile(path.join(OUT, "cashbook-template.xlsx"));
  console.log("✓ cashbook-template.xlsx");
}

/* ══════════════════════════════════════════════════════════════════
   2. PETTY CASH TEMPLATE
══════════════════════════════════════════════════════════════════ */
async function createPettyCash(logoBuf) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CPA OTENE & ASSOCIATES LLP";
  wb.created = new Date();

  const ws = wb.addWorksheet("Petty Cash", {
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true },
  });

  ws.columns = [
    { width: 13 }, { width: 32 }, { width: 13 }, { width: 14 }, { width: 14 },
    { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 },
  ];
  ws.getRow(1).height = 36; ws.getRow(2).height = 18;
  ws.getRow(3).height = 28; ws.getRow(4).height = 18;

  await addBanner(wb, ws, logoBuf, "PETTY CASH REGISTER",
    "CPA OTENE & ASSOCIATES LLP  |  Nairobi, Kenya  |  Tel: +254 747 515 972  |  info@cpaotene.com");

  // Meta
  ws.mergeCells("A5:B5"); labelCell(ws, "A5", "Company:", MG, N, true);
  ws.mergeCells("C5:E5"); dataCell(ws, "C5", "");
  ws.mergeCells("F5:G5"); labelCell(ws, "F5", "Petty Cash Custodian:", MG, N, true);
  ws.mergeCells("H5:J5"); dataCell(ws, "H5", "");
  ws.getRow(5).height = 20;

  ws.mergeCells("A6:B6"); labelCell(ws, "A6", "Period (Month/Year):", MG, N, true);
  ws.mergeCells("C6:E6"); dataCell(ws, "C6", "");
  ws.mergeCells("F6:G6"); labelCell(ws, "F6", "Opening Float (KES):", MG, N, true);
  ws.mergeCells("H6:J6");
  const openFloat = ws.getCell("H6");
  openFloat.value = 0; openFloat.fill = fill(GL); openFloat.font = font(true, 11, N);
  openFloat.alignment = rightAlign(); openFloat.numFmt = "#,##0.00"; openFloat.border = thick(G);
  ws.getRow(6).height = 20;

  ws.getRow(7).height = 10;

  // Expense categories header
  ws.mergeCells("E8:J8");
  const catHead = ws.getCell("E8");
  catHead.value = "EXPENDITURE CATEGORIES (KES)"; catHead.fill = fill(R);
  catHead.font  = font(true, 10, G); catHead.alignment = centerAlign(); catHead.border = thick(R);

  // Column headers
  ["A","B","C","D","E","F","G","H","I","J"].forEach((c, i) => {
    const labels = ["Date","Particulars / Description","Voucher No","Amount Received","Stationery","Transport","Entertainment","Office Supplies","Other","Running Balance"];
    const cell   = ws.getCell(`${c}9`);
    cell.value     = labels[i]; cell.fill = fill(N); cell.font = font(true, 9, G);
    cell.alignment = centerAlign(true); cell.border = thick(R);
  });
  ws.getRow(9).height = 30;

  // Opening balance
  ws.getRow(10).height = 20;
  ["A","B","C","D","E","F","G","H","I"].forEach(c => labelCell(ws, `${c}10`, c === "B" ? "OPENING BALANCE" : "", GL, N, c === "B"));
  const ob = ws.getCell("J10");
  ob.value = { formula: "H6" }; ob.fill = fill(GL); ob.font = font(true, 10, N);
  ob.alignment = rightAlign(); ob.numFmt = "#,##0.00"; ob.border = thick(G);

  // Data rows
  for (let r = 11; r <= 40; r++) {
    ws.getRow(r).height = 18;
    dataCell(ws, `A${r}`); ws.getCell(`A${r}`).numFmt = "DD/MM/YYYY";
    dataCell(ws, `B${r}`);
    dataCell(ws, `C${r}`);
    moneyCell(ws, `D${r}`);
    moneyCell(ws, `E${r}`);
    moneyCell(ws, `F${r}`);
    moneyCell(ws, `G${r}`);
    moneyCell(ws, `H${r}`);
    moneyCell(ws, `I${r}`);
    const prevJ = r === 11 ? "J10" : `J${r - 1}`;
    const totExp = `E${r}+F${r}+G${r}+H${r}+I${r}`;
    const bal = ws.getCell(`J${r}`);
    bal.value = { formula: `${prevJ}+D${r}-(${totExp})` };
    bal.fill  = fill(LG); bal.font = font(false, 10, N);
    bal.alignment = rightAlign(); bal.numFmt = "#,##0.00"; bal.border = border();
  }

  // Totals
  ws.getRow(41).height = 22;
  labelCell(ws, "A41", "", N); ws.getCell("A41").fill = fill(N);
  const totLabel = ws.getCell("B41");
  totLabel.value = "TOTALS"; totLabel.fill = fill(N); totLabel.font = font(true, 11, G);
  totLabel.alignment = centerAlign(); totLabel.border = thick(N);
  ["C","D","E","F","G","H","I"].forEach(c => {
    totalCell(ws, `${c}41`, `SUM(${c}11:${c}40)`, N, G);
    ws.getCell(`${c}41`).font = font(true, 10, G);
  });
  const closing = ws.getCell("J41");
  closing.value = { formula: "J40" }; closing.fill = fill(G);
  closing.font  = font(true, 11, N); closing.alignment = rightAlign();
  closing.numFmt = "#,##0.00"; closing.border = thick(G);

  ws.getRow(43).height = 18;
  ws.mergeCells("A43:E43");
  const p43 = ws.getCell("A43");
  p43.value = "Prepared By: ___________________________   Date: ___________";
  p43.fill = fill(LG); p43.font = font(false, 9, TM); p43.alignment = leftAlign();
  ws.mergeCells("F43:J43");
  const a43 = ws.getCell("F43");
  a43.value = "Approved By: ___________________________   Date: ___________";
  a43.fill = fill(LG); a43.font = font(false, 9, TM); a43.alignment = leftAlign();

  ws.getRow(44).height = 8;
  ws.mergeCells("A45:J45"); const foot = ws.getCell("A45");
  foot.value = "© CPA OTENE & ASSOCIATES LLP — Petty Cash Register Template. All figures in Kenya Shillings (KES).";
  foot.fill  = fill(N); foot.font = font(false, 8, G); foot.alignment = centerAlign();

  await wb.xlsx.writeFile(path.join(OUT, "petty-cash-template.xlsx"));
  console.log("✓ petty-cash-template.xlsx");
}

/* ══════════════════════════════════════════════════════════════════
   3. SALES INVOICE TEMPLATE
══════════════════════════════════════════════════════════════════ */
async function createInvoice(logoBuf) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CPA OTENE & ASSOCIATES LLP";
  wb.created = new Date();

  const ws = wb.addWorksheet("Invoice", {
    pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true },
  });

  ws.columns = [
    { width: 6 }, { width: 34 }, { width: 10 }, { width: 16 }, { width: 18 },
  ];
  ws.getRow(1).height = 40;
  ws.getRow(2).height = 20;

  // Logo left
  ws.mergeCells("A1:C2"); ws.getCell("A1").fill = fill(W);
  await addLogo(wb, ws, logoBuf, 1, 1, 180, 50);

  // INVOICE title right
  ws.mergeCells("D1:E1");
  const invTitle = ws.getCell("D1");
  invTitle.value     = "INVOICE"; invTitle.fill = fill(N);
  invTitle.font      = font(true, 26, G); invTitle.alignment = centerAlign();

  ws.mergeCells("D2:E2");
  const invSub = ws.getCell("D2");
  invSub.value = "TAX INVOICE"; invSub.fill = fill(R);
  invSub.font  = font(true, 11, G); invSub.alignment = centerAlign();

  // Company details band
  ws.getRow(3).height = 14;
  ws.mergeCells("A3:C3");
  const compAddr = ws.getCell("A3");
  compAddr.value = "CPA OTENE & ASSOCIATES LLP  |  Ngong Road, Oldonyo Villas Suite 1, Nairobi, Kenya";
  compAddr.fill  = fill(LG); compAddr.font = font(false, 9, N); compAddr.alignment = leftAlign();
  ws.mergeCells("D3:E3");
  const compContact = ws.getCell("D3");
  compContact.value = "Tel: +254 747 515 972  |  Email: info@cpaotene.com  |  www.cpaotene.com";
  compContact.fill  = fill(LG); compContact.font = font(false, 9, N); compContact.alignment = rightAlign();

  ws.getRow(4).height = 8;

  // Invoice details box (right column)
  ws.getRow(5).height = 18;
  ws.mergeCells("D5:D5"); labelCell(ws, "D5", "Invoice No:", MG, N, true);
  dataCell(ws, "E5", "INV-001");
  ws.getRow(6).height = 18;
  labelCell(ws, "D6", "Invoice Date:", MG, N, true);
  dataCell(ws, "E6", new Date()); ws.getCell("E6").numFmt = "DD/MM/YYYY";
  ws.getRow(7).height = 18;
  labelCell(ws, "D7", "Due Date:", MG, N, true);
  const due = ws.getCell("E7");
  due.value = { formula: "E6+30" }; due.numFmt = "DD/MM/YYYY";
  due.fill  = fill(GL); due.font = font(false, 10, N); due.alignment = leftAlign(); due.border = border();
  ws.getRow(8).height = 18;
  labelCell(ws, "D8", "PIN / VAT No:", MG, N, true);
  dataCell(ws, "E8", "");

  // BILL TO (left column)
  ws.mergeCells("A5:C5"); const billTo = ws.getCell("A5");
  billTo.value = "BILL TO"; billTo.fill = fill(N); billTo.font = font(true, 10, G);
  billTo.alignment = leftAlign(); billTo.border = thick(N);
  for (let r = 6; r <= 10; r++) {
    ws.getRow(r).height = 18;
    ws.mergeCells(`A${r}:C${r}`);
    dataCell(ws, `A${r}`, r === 6 ? "Client / Company Name" : r === 7 ? "Address Line 1" : r === 8 ? "Address Line 2" : r === 9 ? "City, Country" : "PIN / VAT Number");
    ws.getCell(`A${r}`).font.color = { argb: `FF${r === 6 ? N : TM}` };
    ws.getCell(`A${r}`).font.bold  = r === 6;
  }

  ws.getRow(11).height = 8;

  // Line items header
  ws.getRow(12).height = 24;
  const itemCols = ["#","Item Description","Qty","Unit Price (KES)","Amount (KES)"];
  ["A","B","C","D","E"].forEach((c, i) => {
    const cell   = ws.getCell(`${c}12`);
    cell.value   = itemCols[i]; cell.fill = fill(N); cell.font = font(true, 10, G);
    cell.alignment = i < 2 ? leftAlign() : rightAlign(); cell.border = thick(N);
  });

  // 15 line item rows
  for (let r = 13; r <= 27; r++) {
    ws.getRow(r).height = 20;
    const num = ws.getCell(`A${r}`);
    num.value = r - 12; num.fill = fill(r % 2 === 0 ? LG : W);
    num.font  = font(false, 10, TM); num.alignment = centerAlign(); num.border = border();
    dataCell(ws, `B${r}`, "");
    moneyCell(ws, `C${r}`, 1); ws.getCell(`C${r}`).numFmt = "#,##0";
    moneyCell(ws, `D${r}`, 0);
    const amt = ws.getCell(`E${r}`);
    amt.value = { formula: `C${r}*D${r}` }; amt.fill = fill(r % 2 === 0 ? GL : W);
    amt.font  = font(false, 10, N); amt.alignment = rightAlign();
    amt.numFmt = "#,##0.00"; amt.border = border();
  }

  // Totals section
  ws.getRow(28).height = 8;
  ws.getRow(29).height = 20;
  ws.mergeCells("A29:C29"); labelCell(ws, "A29", "", LG);
  labelCell(ws, "D29", "SUB-TOTAL", MG, N, true); ws.getCell("D29").alignment = rightAlign();
  totalCell(ws, "E29", "SUM(E13:E27)", LG, N);

  ws.getRow(30).height = 20;
  ws.mergeCells("A30:C30"); labelCell(ws, "A30", "Notes:", MG, N, true);
  labelCell(ws, "D30", "VAT (16%)", MG, N, true); ws.getCell("D30").alignment = rightAlign();
  totalCell(ws, "E30", "E29*0.16", LG, N);

  ws.getRow(31).height = 24;
  ws.mergeCells("A31:C34"); const notesCell = ws.getCell("A31");
  notesCell.value = ""; notesCell.fill = fill(W); notesCell.border = border();
  notesCell.alignment = { horizontal: "left", vertical: "top", wrapText: true };

  ws.getRow(31).height = 24;
  const totLabel = ws.getCell("D31");
  totLabel.value = "TOTAL (KES)"; totLabel.fill = fill(N); totLabel.font = font(true, 12, G);
  totLabel.alignment = rightAlign(); totLabel.border = thick(G);
  const totVal = ws.getCell("E31");
  totVal.value  = { formula: "E29+E30" }; totVal.fill = fill(G);
  totVal.font   = font(true, 13, N); totVal.alignment = rightAlign();
  totVal.numFmt = "#,##0.00"; totVal.border = thick(G);

  for (let r = 32; r <= 34; r++) {
    ws.getRow(r).height = 18;
    labelCell(ws, `D${r}`, r === 32 ? "Amount Paid" : r === 33 ? "Balance Due" : "", LG, N, true);
    ws.getCell(`D${r}`).alignment = rightAlign();
    if (r === 32) { moneyCell(ws, `E${r}`, 0, W, N); }
    if (r === 33) {
      const bal = ws.getCell(`E${r}`);
      bal.value = { formula: "E31-E32" }; bal.fill = fill(GL);
      bal.font  = font(true, 11, N); bal.alignment = rightAlign();
      bal.numFmt = "#,##0.00"; bal.border = thick(G);
    }
    if (r === 34) { ws.getCell(`E${r}`).fill = fill(W); }
  }

  // Payment details
  ws.getRow(36).height = 10;
  ws.mergeCells("A37:E37"); const payHead = ws.getCell("A37");
  payHead.value = "PAYMENT DETAILS"; payHead.fill = fill(R); payHead.font = font(true, 10, G);
  payHead.alignment = centerAlign(); payHead.border = thick(R);

  const payInfo = [
    ["Bank Name:",       ""],
    ["Account Name:",    "CPA OTENE & ASSOCIATES LLP"],
    ["Account Number:",  ""],
    ["Branch:",          ""],
    ["Payment Terms:",   "Payment due within 30 days of invoice date"],
  ];
  payInfo.forEach(([label, val], i) => {
    ws.getRow(38 + i).height = 18;
    ws.mergeCells(`A${38+i}:B${38+i}`);
    labelCell(ws, `A${38+i}`, label, MG, N, true); ws.getCell(`A${38+i}`).alignment = rightAlign();
    ws.mergeCells(`C${38+i}:E${38+i}`);
    dataCell(ws, `C${38+i}`, val);
  });

  ws.getRow(44).height = 8;
  ws.mergeCells("A45:E45"); const foot = ws.getCell("A45");
  foot.value = "Thank you for your business! — CPA OTENE & ASSOCIATES LLP | This is a computer-generated document.";
  foot.fill  = fill(N); foot.font = font(false, 8, G); foot.alignment = centerAlign();

  await wb.xlsx.writeFile(path.join(OUT, "sales-invoice-template.xlsx"));
  console.log("✓ sales-invoice-template.xlsx");
}

/* ══════════════════════════════════════════════════════════════════
   4. PAYROLL TEMPLATE
══════════════════════════════════════════════════════════════════ */
async function createPayroll(logoBuf) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CPA OTENE & ASSOCIATES LLP";
  wb.created = new Date();

  const ws = wb.addWorksheet("Payroll Register", {
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1 },
  });

  ws.columns = [
    { width: 5  }, // No
    { width: 22 }, // Name
    { width: 12 }, // ID / PIN
    { width: 14 }, // Department
    { width: 16 }, // Position
    { width: 14 }, // Basic Salary
    { width: 12 }, // House Allow
    { width: 12 }, // Transport
    { width: 12 }, // Other Allow
    { width: 14 }, // Gross Pay
    { width: 12 }, // PAYE
    { width: 10 }, // NHIF
    { width: 10 }, // NSSF
    { width: 12 }, // Other Dedn
    { width: 14 }, // Total Deductions
    { width: 14 }, // Net Pay
  ];
  ws.getRow(1).height = 36; ws.getRow(2).height = 18;
  ws.getRow(3).height = 28; ws.getRow(4).height = 18;

  await addBanner(wb, ws, logoBuf, "MONTHLY PAYROLL REGISTER",
    "CPA OTENE & ASSOCIATES LLP  |  Nairobi, Kenya  |  Tel: +254 747 515 972  |  info@cpaotene.com");

  // Meta
  ws.mergeCells("A5:D5"); labelCell(ws, "A5", "Company:", MG, N, true);
  ws.mergeCells("E5:H5"); dataCell(ws, "E5", "");
  ws.mergeCells("I5:K5"); labelCell(ws, "I5", "Month / Year:", MG, N, true);
  ws.mergeCells("L5:N5"); dataCell(ws, "L5", "");
  ws.mergeCells("O5:P5"); dataCell(ws, "O5", ""); ws.getCell("O5").numFmt = "MMMM YYYY";
  ws.getRow(5).height = 20;

  ws.mergeCells("A6:D6"); labelCell(ws, "A6", "Prepared By:", MG, N, true);
  ws.mergeCells("E6:H6"); dataCell(ws, "E6", "");
  ws.mergeCells("I6:K6"); labelCell(ws, "I6", "Approved By:", MG, N, true);
  ws.mergeCells("L6:N6"); dataCell(ws, "L6", "");
  ws.mergeCells("O6:P6"); dataCell(ws, "O6", "");
  ws.getRow(6).height = 20;

  ws.getRow(7).height = 10;

  // Group headers row 8
  ws.getRow(8).height = 20;
  ws.mergeCells("A8:E8"); headerCell(ws, "A8", "EMPLOYEE DETAILS", N, W);
  ws.mergeCells("F8:J8"); headerCell(ws, "F8", "EARNINGS (KES)", R, G);
  ws.mergeCells("K8:O8"); headerCell(ws, "K8", "STATUTORY DEDUCTIONS (KES)", "2D3640", G);
  ws.mergeCells("P8:P8"); headerCell(ws, "P8", "NET PAY", G, N);

  // Column headers row 9
  ws.getRow(9).height = 34;
  const hd = [
    "No","Employee Name","ID / PIN No","Department","Position",
    "Basic Salary","House Allowance","Transport Allowance","Other Allowances","Gross Pay",
    "PAYE","NHIF","NSSF","Other Deductions","Total Deductions",
    "Net Pay (KES)"
  ];
  const cols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"];
  hd.forEach((h, i) => {
    const cell = ws.getCell(`${cols[i]}9`);
    cell.value = h; cell.fill = fill(N);
    cell.font  = font(true, 9, G); cell.alignment = centerAlign(true); cell.border = thick(R);
  });

  // Employee rows 10–39
  for (let r = 10; r <= 39; r++) {
    ws.getRow(r).height = 18;
    const bg = r % 2 === 0 ? LG : W;
    const num = ws.getCell(`A${r}`); num.value = r - 9;
    num.fill = fill(bg); num.font = font(false, 9, TM);
    num.alignment = centerAlign(); num.border = border();
    ["B","C","D","E"].forEach(c => { dataCell(ws, `${c}${r}`, ""); ws.getCell(`${c}${r}`).fill = fill(bg); });
    ["F","G","H","I"].forEach(c => moneyCell(ws, `${c}${r}`, undefined, bg));
    // Gross Pay = Basic + House + Transport + Other
    const gp = ws.getCell(`J${r}`);
    gp.value  = { formula: `F${r}+G${r}+H${r}+I${r}` };
    gp.fill   = fill(GL); gp.font = font(true, 10, N);
    gp.alignment = rightAlign(); gp.numFmt = "#,##0.00"; gp.border = border();
    ["K","L","M","N"].forEach(c => moneyCell(ws, `${c}${r}`, undefined, bg));
    // Total Deductions
    const td = ws.getCell(`O${r}`);
    td.value  = { formula: `K${r}+L${r}+M${r}+N${r}` };
    td.fill   = fill(bg); td.font = font(true, 10, "2D3640");
    td.alignment = rightAlign(); td.numFmt = "#,##0.00"; td.border = border();
    // Net Pay
    const np = ws.getCell(`P${r}`);
    np.value  = { formula: `J${r}-O${r}` };
    np.fill   = fill(GL); np.font = font(true, 10, N);
    np.alignment = rightAlign(); np.numFmt = "#,##0.00"; np.border = thick(G);
  }

  // Totals row
  ws.getRow(40).height = 24;
  ws.mergeCells("A40:E40");
  const tl = ws.getCell("A40");
  tl.value = "PAYROLL TOTALS"; tl.fill = fill(N); tl.font = font(true, 11, G);
  tl.alignment = centerAlign(); tl.border = thick(N);
  ["F","G","H","I","J","K","L","M","N","O","P"].forEach(c => {
    totalCell(ws, `${c}40`, `SUM(${c}10:${c}39)`, c === "J" || c === "P" ? G : N, c === "J" || c === "P" ? N : G);
  });

  ws.getRow(42).height = 18;
  ws.mergeCells("A42:E42"); const s42 = ws.getCell("A42");
  s42.value = "Prepared By: ___________________________   Signature: ___________________________";
  s42.fill = fill(LG); s42.font = font(false, 9, TM); s42.alignment = leftAlign();
  ws.mergeCells("F42:K42"); const a42 = ws.getCell("F42");
  a42.value = "Finance Manager: ___________________________   Signature: ___________________________";
  a42.fill = fill(LG); a42.font = font(false, 9, TM); a42.alignment = leftAlign();
  ws.mergeCells("L42:P42"); const d42 = ws.getCell("L42");
  d42.value = "Authorized By: ___________________________   Date: ___________________________";
  d42.fill = fill(LG); d42.font = font(false, 9, TM); d42.alignment = leftAlign();

  ws.getRow(43).height = 8;
  ws.mergeCells("A44:P44"); const foot = ws.getCell("A44");
  foot.value = "© CPA OTENE & ASSOCIATES LLP — Payroll Register Template. CONFIDENTIAL. All figures in KES.";
  foot.fill  = fill(N); foot.font = font(false, 8, G); foot.alignment = centerAlign();

  await wb.xlsx.writeFile(path.join(OUT, "payroll-template.xlsx"));
  console.log("✓ payroll-template.xlsx");
}

/* ══════════════════════════════════════════════════════════════════
   5. EXPENSE TRACKER
══════════════════════════════════════════════════════════════════ */
async function createExpenseTracker(logoBuf) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CPA OTENE & ASSOCIATES LLP";
  wb.created = new Date();

  // ── Main tracker sheet
  const ws = wb.addWorksheet("Expense Tracker", {
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true },
  });

  ws.columns = [
    { width: 12 }, { width: 20 }, { width: 28 }, { width: 20 },
    { width: 14 }, { width: 14 }, { width: 14 }, { width: 14 },
    { width: 14 }, { width: 16 }, { width: 16 },
  ];
  ws.getRow(1).height = 36; ws.getRow(2).height = 18;
  ws.getRow(3).height = 28; ws.getRow(4).height = 18;

  await addBanner(wb, ws, logoBuf, "BUSINESS EXPENSE TRACKER",
    "CPA OTENE & ASSOCIATES LLP  |  Nairobi, Kenya  |  Tel: +254 747 515 972  |  info@cpaotene.com");

  ws.mergeCells("A5:C5"); labelCell(ws, "A5", "Company / Department:", MG, N, true);
  ws.mergeCells("D5:F5"); dataCell(ws, "D5", "");
  ws.mergeCells("G5:H5"); labelCell(ws, "G5", "Financial Year:", MG, N, true);
  ws.mergeCells("I5:K5"); dataCell(ws, "I5", "");
  ws.getRow(5).height = 20;

  ws.mergeCells("A6:C6"); labelCell(ws, "A6", "Prepared By:", MG, N, true);
  ws.mergeCells("D6:F6"); dataCell(ws, "D6", "");
  ws.mergeCells("G6:H6"); labelCell(ws, "G6", "Cost Centre:", MG, N, true);
  ws.mergeCells("I6:K6"); dataCell(ws, "I6", "");
  ws.getRow(6).height = 20;

  ws.getRow(7).height = 10;

  const catOpts = ["Rent","Utilities","Transport","Stationery","Entertainment","Repairs","Salaries","Marketing","Other"];
  const heads = [
    "Date","Expense Category","Description / Narration","Supplier / Vendor",
    "Receipt / Ref No","Amount (KES)","VAT (KES)","Total (KES)","Approved By","Status","Notes"
  ];
  const hcols = ["A","B","C","D","E","F","G","H","I","J","K"];
  ws.getRow(8).height = 28;
  heads.forEach((h, i) => {
    const cell = ws.getCell(`${hcols[i]}8`);
    cell.value = h; cell.fill = fill(N); cell.font = font(true, 9, G);
    cell.alignment = centerAlign(true); cell.border = thick(R);
  });

  for (let r = 9; r <= 48; r++) {
    ws.getRow(r).height = 18;
    const bg = r % 2 === 0 ? LG : W;
    dataCell(ws, `A${r}`, ""); ws.getCell(`A${r}`).numFmt = "DD/MM/YYYY"; ws.getCell(`A${r}`).fill = fill(bg);
    dataCell(ws, `B${r}`, ""); ws.getCell(`B${r}`).fill = fill(bg);
    dataCell(ws, `C${r}`, ""); ws.getCell(`C${r}`).fill = fill(bg);
    dataCell(ws, `D${r}`, ""); ws.getCell(`D${r}`).fill = fill(bg);
    dataCell(ws, `E${r}`, ""); ws.getCell(`E${r}`).fill = fill(bg);
    moneyCell(ws, `F${r}`, undefined, bg);
    // VAT = Amount * 0.16
    const vat = ws.getCell(`G${r}`);
    vat.value = { formula: `F${r}*0.16` }; vat.fill = fill(bg);
    vat.font  = font(false, 10, TM); vat.alignment = rightAlign(); vat.numFmt = "#,##0.00"; vat.border = border();
    // Total = Amount + VAT
    const tot = ws.getCell(`H${r}`);
    tot.value = { formula: `F${r}+G${r}` }; tot.fill = fill(GL);
    tot.font  = font(false, 10, N); tot.alignment = rightAlign(); tot.numFmt = "#,##0.00"; tot.border = border();
    dataCell(ws, `I${r}`, ""); ws.getCell(`I${r}`).fill = fill(bg);
    dataCell(ws, `J${r}`, ""); ws.getCell(`J${r}`).fill = fill(bg);
    dataCell(ws, `K${r}`, ""); ws.getCell(`K${r}`).fill = fill(bg);
  }

  ws.getRow(49).height = 22;
  ws.mergeCells("A49:E49");
  const tl = ws.getCell("A49");
  tl.value = "TOTALS"; tl.fill = fill(N); tl.font = font(true, 11, G); tl.alignment = centerAlign(); tl.border = thick(N);
  ["F","G","H"].forEach(c => totalCell(ws, `${c}49`, `SUM(${c}9:${c}48)`, c === "H" ? G : N, c === "H" ? N : G));
  ["I","J","K"].forEach(c => { ws.getCell(`${c}49`).fill = fill(N); ws.getCell(`${c}49`).border = thick(N); });

  // ── Summary sheet
  const ws2 = wb.addWorksheet("Category Summary");
  ws2.columns = [{ width: 26 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 20 }];
  ws2.getRow(1).height = 36; ws2.getRow(2).height = 18;
  ws2.getRow(3).height = 28;

  ws2.mergeCells("A1:E2"); ws2.getCell("A1").fill = fill(W);
  await addLogo(wb, ws2, logoBuf, 1, 1, 180, 48);
  ws2.mergeCells("A3:E3");
  const t3 = ws2.getCell("A3");
  t3.value = "EXPENSE SUMMARY BY CATEGORY"; t3.fill = fill(N);
  t3.font  = font(true, 14, G); t3.alignment = centerAlign();

  ws2.getRow(5).height = 24;
  ["A","B","C","D","E"].forEach((c, i) => {
    const cell = ws2.getCell(`${c}5`);
    cell.value = ["Expense Category","Amount (KES)","VAT (KES)","Total (KES)","% of Total"][i];
    cell.fill  = fill(N); cell.font = font(true, 10, G);
    cell.alignment = i === 0 ? leftAlign() : rightAlign(); cell.border = thick(N);
  });

  catOpts.forEach((cat, i) => {
    const r = 6 + i;
    ws2.getRow(r).height = 20;
    const bg = i % 2 === 0 ? LG : W;
    const lc = ws2.getCell(`A${r}`); lc.value = cat; lc.fill = fill(bg); lc.font = font(false, 10, N); lc.alignment = leftAlign(); lc.border = border();
    ["B","C","D","E"].forEach(c => { const mc = ws2.getCell(`${c}${r}`); mc.value = 0; mc.fill = fill(bg); mc.font = font(false, 10, N); mc.alignment = rightAlign(); mc.numFmt = c === "E" ? "0.00%" : "#,##0.00"; mc.border = border(); });
  });

  const totR = 6 + catOpts.length;
  ws2.getRow(totR).height = 22;
  const ta = ws2.getCell(`A${totR}`); ta.value = "GRAND TOTAL"; ta.fill = fill(G); ta.font = font(true, 11, N); ta.alignment = leftAlign(); ta.border = thick(G);
  ["B","C","D"].forEach(c => totalCell(ws2, `${c}${totR}`, `SUM(${c}6:${c}${totR-1})`, G, N));
  const pct = ws2.getCell(`E${totR}`); pct.value = 1; pct.fill = fill(G); pct.font = font(true, 11, N); pct.alignment = rightAlign(); pct.numFmt = "0.00%"; pct.border = thick(G);

  await wb.xlsx.writeFile(path.join(OUT, "expense-tracker.xlsx"));
  console.log("✓ expense-tracker.xlsx");
}

/* ══════════════════════════════════════════════════════════════════
   6. BANK RECONCILIATION TEMPLATE
══════════════════════════════════════════════════════════════════ */
async function createBankReconciliation(logoBuf) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CPA OTENE & ASSOCIATES LLP";
  wb.created = new Date();

  const ws = wb.addWorksheet("Bank Reconciliation", {
    pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true },
  });

  ws.columns = [
    { width: 5 }, { width: 40 }, { width: 18 }, { width: 18 }, { width: 14 },
  ];
  ws.getRow(1).height = 36; ws.getRow(2).height = 18;
  ws.getRow(3).height = 28; ws.getRow(4).height = 18;

  await addBanner(wb, ws, logoBuf, "BANK RECONCILIATION STATEMENT",
    "CPA OTENE & ASSOCIATES LLP  |  Nairobi, Kenya  |  Tel: +254 747 515 972  |  info@cpaotene.com");

  // Meta
  ws.mergeCells("A5:B5"); labelCell(ws, "A5", "Company:", MG, N, true);
  ws.mergeCells("C5:E5"); dataCell(ws, "C5", "");
  ws.getRow(5).height = 20;
  ws.mergeCells("A6:B6"); labelCell(ws, "A6", "Bank Name:", MG, N, true);
  ws.mergeCells("C6:E6"); dataCell(ws, "C6", "");
  ws.getRow(6).height = 20;
  ws.mergeCells("A7:B7"); labelCell(ws, "A7", "Account Number:", MG, N, true);
  ws.mergeCells("C7:E7"); dataCell(ws, "C7", "");
  ws.getRow(7).height = 20;
  ws.mergeCells("A8:B8"); labelCell(ws, "A8", "Reconciliation Date:", MG, N, true);
  ws.mergeCells("C8:E8"); dataCell(ws, "C8", new Date()); ws.getCell("C8").numFmt = "DD MMMM YYYY";
  ws.getRow(8).height = 20;

  ws.getRow(9).height = 12;

  // Helper for section header
  function secHead(r, label) {
    ws.getRow(r).height = 22;
    ws.mergeCells(`A${r}:D${r}`);
    const c = ws.getCell(`A${r}`);
    c.value = label; c.fill = fill(R); c.font = font(true, 11, G);
    c.alignment = leftAlign(); c.border = thick(R);
    ws.getCell(`E${r}`).fill = fill(R); ws.getCell(`E${r}`).border = thick(R);
  }

  function amtRow(r, label, ref = null, bg = W) {
    ws.getRow(r).height = 18;
    ws.mergeCells(`A${r}:A${r}`);
    const num = ws.getCell(`A${r}`); num.fill = fill(bg); num.border = border();
    ws.mergeCells(`B${r}:D${r}`);
    const lbl = ws.getCell(`B${r}`);
    lbl.value = label; lbl.fill = fill(bg); lbl.font = font(false, 10, N); lbl.alignment = leftAlign(); lbl.border = border();
    const amt = ws.getCell(`E${r}`);
    if (ref) amt.value = { formula: ref };
    amt.fill = fill(bg); amt.font = font(ref ? true : false, 10, ref ? N : TM);
    amt.alignment = rightAlign(); amt.numFmt = "#,##0.00"; amt.border = ref ? thick(G) : border();
  }

  function entryRow(r, num, bg = W) {
    ws.getRow(r).height = 18;
    const n = ws.getCell(`A${r}`); n.value = num; n.fill = fill(bg); n.font = font(false, 9, TM); n.alignment = centerAlign(); n.border = border();
    ws.mergeCells(`B${r}:D${r}`);
    dataCell(ws, `B${r}`, ""); ws.getCell(`B${r}`).fill = fill(bg);
    moneyCell(ws, `E${r}`, undefined, bg);
  }

  function subtotalRow(r, formula, label, bg = GL) {
    ws.getRow(r).height = 20;
    ws.mergeCells(`A${r}:D${r}`);
    const lbl = ws.getCell(`A${r}`);
    lbl.value = label; lbl.fill = fill(bg); lbl.font = font(true, 10, N); lbl.alignment = rightAlign(); lbl.border = thick(G);
    totalCell(ws, `E${r}`, formula, bg, N);
  }

  /* SECTION A — Bank Statement */
  secHead(10, "SECTION A:  BALANCE AS PER BANK STATEMENT");

  ws.getRow(11).height = 20;
  ws.mergeCells("A11:D11"); labelCell(ws, "A11", "Balance as per Bank Statement (closing balance):", MG, N, true); ws.getCell("A11").alignment = rightAlign();
  moneyCell(ws, "E11", 0, GL, N); ws.getCell("E11").border = thick(G); ws.getCell("E11").font = font(true, 11, N);

  ws.getRow(12).height = 18;
  ws.mergeCells("A12:E12");
  const add1 = ws.getCell("A12");
  add1.value = "ADD:  Deposits in Transit (received by company but not yet credited by bank)";
  add1.fill  = fill(MG); add1.font = font(true, 9, N); add1.alignment = leftAlign(); add1.border = border();

  for (let r = 13; r <= 17; r++) entryRow(r, r - 12, r % 2 === 0 ? LG : W);

  subtotalRow(18, "SUM(E13:E17)", "Total Deposits in Transit  (+)");

  ws.getRow(19).height = 18;
  ws.mergeCells("A19:E19");
  const les1 = ws.getCell("A19");
  les1.value = "LESS:  Outstanding Cheques / Payments (issued by company but not yet cleared by bank)";
  les1.fill  = fill(MG); les1.font = font(true, 9, N); les1.alignment = leftAlign(); les1.border = border();

  for (let r = 20; r <= 24; r++) entryRow(r, r - 19, r % 2 === 0 ? LG : W);

  subtotalRow(25, "SUM(E20:E24)", "Total Outstanding Cheques  (–)");

  ws.getRow(26).height = 24;
  ws.mergeCells("A26:D26"); const ab = ws.getCell("A26");
  ab.value = "ADJUSTED / CORRECTED BANK BALANCE  (A)"; ab.fill = fill(N); ab.font = font(true, 12, G);
  ab.alignment = rightAlign(); ab.border = thick(N);
  const abv = ws.getCell("E26");
  abv.value = { formula: "E11+E18-E25" }; abv.fill = fill(G);
  abv.font  = font(true, 13, N); abv.alignment = rightAlign(); abv.numFmt = "#,##0.00"; abv.border = thick(G);

  ws.getRow(27).height = 12;

  /* SECTION B — Company Books */
  secHead(28, "SECTION B:  BALANCE AS PER COMPANY BOOKS (CASHBOOK)");

  ws.getRow(29).height = 20;
  ws.mergeCells("A29:D29"); labelCell(ws, "A29", "Balance as per Cashbook / Company Records:", MG, N, true); ws.getCell("A29").alignment = rightAlign();
  moneyCell(ws, "E29", 0, GL, N); ws.getCell("E29").border = thick(G); ws.getCell("E29").font = font(true, 11, N);

  ws.getRow(30).height = 18;
  ws.mergeCells("A30:E30");
  const add2 = ws.getCell("A30");
  add2.value = "ADD:  Credits in Bank not recorded in Cashbook (e.g. bank interest, direct deposits)";
  add2.fill  = fill(MG); add2.font = font(true, 9, N); add2.alignment = leftAlign(); add2.border = border();

  for (let r = 31; r <= 33; r++) entryRow(r, r - 30, r % 2 === 0 ? LG : W);
  subtotalRow(34, "SUM(E31:E33)", "Total Credits not in Books  (+)");

  ws.getRow(35).height = 18;
  ws.mergeCells("A35:E35");
  const les2 = ws.getCell("A35");
  les2.value = "LESS:  Debits in Bank not recorded in Cashbook (e.g. bank charges, direct debits)";
  les2.fill  = fill(MG); les2.font = font(true, 9, N); les2.alignment = leftAlign(); les2.border = border();

  for (let r = 36; r <= 38; r++) entryRow(r, r - 35, r % 2 === 0 ? LG : W);
  subtotalRow(39, "SUM(E36:E38)", "Total Debits not in Books  (–)");

  ws.getRow(40).height = 24;
  ws.mergeCells("A40:D40"); const bb = ws.getCell("A40");
  bb.value = "ADJUSTED / CORRECTED BOOK BALANCE  (B)"; bb.fill = fill(N); bb.font = font(true, 12, G);
  bb.alignment = rightAlign(); bb.border = thick(N);
  const bbv = ws.getCell("E40");
  bbv.value = { formula: "E29+E34-E39" }; bbv.fill = fill(G);
  bbv.font  = font(true, 13, N); bbv.alignment = rightAlign(); bbv.numFmt = "#,##0.00"; bbv.border = thick(G);

  ws.getRow(41).height = 12;

  /* SECTION C — Reconciliation Check */
  secHead(42, "SECTION C:  RECONCILIATION CHECK");

  amtRow(43, "Adjusted Bank Balance  (A)", "E26", LG);
  amtRow(44, "Adjusted Book Balance  (B)", "E40", LG);

  ws.getRow(45).height = 24;
  ws.mergeCells("A45:D45"); const diff = ws.getCell("A45");
  diff.value = "DIFFERENCE  (A – B)   ← Should equal ZERO"; diff.fill = fill(R);
  diff.font  = font(true, 12, W); diff.alignment = rightAlign(); diff.border = thick(R);
  const diffv = ws.getCell("E45");
  diffv.value = { formula: "E43-E44" }; diffv.fill = fill("059652");
  diffv.font  = font(true, 13, W); diffv.alignment = rightAlign(); diffv.numFmt = "#,##0.00"; diffv.border = thick("059652");

  ws.getRow(47).height = 16;
  ws.mergeCells("A47:E47"); const note = ws.getCell("A47");
  note.value = "If the difference is not zero, investigate: errors in cashbook, timing differences, or bank errors.";
  note.fill  = fill(GL); note.font = font(false, 9, N); note.alignment = leftAlign();

  ws.getRow(49).height = 18;
  ws.mergeCells("A49:C49"); const p49 = ws.getCell("A49");
  p49.value = "Prepared By: ___________________________   Date: ___________";
  p49.fill = fill(LG); p49.font = font(false, 9, TM); p49.alignment = leftAlign();
  ws.mergeCells("D49:E49"); const a49 = ws.getCell("D49");
  a49.value = "Reviewed By: ___________________________   Date: ___________";
  a49.fill = fill(LG); a49.font = font(false, 9, TM); a49.alignment = leftAlign();

  ws.getRow(50).height = 8;
  ws.mergeCells("A51:E51"); const foot = ws.getCell("A51");
  foot.value = "© CPA OTENE & ASSOCIATES LLP — Bank Reconciliation Template. All figures in Kenya Shillings (KES).";
  foot.fill  = fill(N); foot.font = font(false, 8, G); foot.alignment = centerAlign();

  await wb.xlsx.writeFile(path.join(OUT, "bank-reconciliation-template.xlsx"));
  console.log("✓ bank-reconciliation-template.xlsx");
}

/* ─── Main ─────────────────────────────────────────────────────── */
async function main() {
  console.log("\nCPA OTENE & ASSOCIATES LLP — Template Generator");
  console.log("═".repeat(52));
  const logoBuf = await getLogoBuf();
  console.log(`Logo: ${fs.existsSync(LOGO_PNG) ? "using public/logo.png ✓" : "using SVG fallback (place logo.png in public/ for real logo)"}`);
  console.log("");

  await createCashbook(logoBuf);
  await createPettyCash(logoBuf);
  await createInvoice(logoBuf);
  await createPayroll(logoBuf);
  await createExpenseTracker(logoBuf);
  await createBankReconciliation(logoBuf);

  console.log("");
  console.log("═".repeat(52));
  console.log(`✓ All 6 templates saved to public/downloads/`);
  console.log("  Ready for download at /downloads/<filename>\n");
}

main().catch((err) => {
  console.error("Error generating templates:", err);
  process.exit(1);
});
