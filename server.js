/**
 * CPA Otene and Associates LLP — cPanel / Phusion Passenger Entry Point
 *
 * cPanel's Node.js App manager launches this file via Passenger.
 * Passenger injects the PORT through process.env.PORT automatically.
 *
 * This file simply boots Next.js's standalone server.
 * It must be named "app.js" OR configured as the startup file in cPanel.
 * We recommend naming it "app.js" — see DEPLOYMENT-CPANEL.md.
 */

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost";
// Passenger sets PORT automatically; fall back to 3000 for local testing
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error handling request:", err);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> CPA Otene website ready on http://${hostname}:${port}`);
    console.log(`> Environment: ${process.env.NODE_ENV || "development"}`);
  });
});
