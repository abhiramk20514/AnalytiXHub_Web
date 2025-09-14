import path from "path";
import { createServer } from "./index";
import * as express from "express";

const app = createServer();
const port = process.env.PORT || 5000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

// --- Middleware to serve SPA static files ---
app.use(express.static(distPath));

// --- OAuth and API routes are already mounted in createServer() ---
// They must come before the catch-all below

// --- Health check route ---
app.get("/api/ping", (_req, res) => {
  res.json({ message: "pong" });
});

// --- Catch-all for SPA routes ---
app.get("*", (req, res) => {
  // Don't serve index.html for API, Auth, or health routes
  if (
    req.path.startsWith("/api/") ||
    req.path.startsWith("/auth/") ||
    req.path.startsWith("/health")
  ) {
    return res.status(404).json({ error: "Endpoint not found" });
  }

  // Serve SPA for all other frontend routes
  res.sendFile(path.join(distPath, "index.html"));
});

// --- Start server ---
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// --- Graceful shutdown ---
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
