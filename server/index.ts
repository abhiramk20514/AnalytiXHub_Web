import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // OAuth routes
  app.use("/auth", authRoutes);

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "pong" });
  });

  return app;
}

// Export the server for serverless or node-build
export default createServer();
