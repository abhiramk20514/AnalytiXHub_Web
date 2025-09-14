import express from "express";
import cors from "cors";
import authRoutes from "./routes/demo";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Mount auth routes at /api
  app.use("/api/auth", authRoutes);

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "pong" });
  });

  return app;
}
