import "dotenv/config";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import authRoutes from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "pong" });
  });

  // OAuth routes (prefix with /api)
  app.use("/api/auth", authRoutes);

  return app;
}

const app = createServer();
export default serverless(app);
