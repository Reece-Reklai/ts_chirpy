import express from "express";
import type { router } from "../config.js";
import {
  middlewareLogResponses,
  createMiddlewareMetrics,
  healthHandler,
  createMetricsHandler,
  createResetHandler,
} from "./middleware.js";

export function registerRoutes(app: router) {
  // Apply the middleware to all routes
  app.server.use(middlewareLogResponses, createMiddlewareMetrics(app));
  // Routing Path
  app.server.use("/app", express.static("./src/app"));
  app.server.get("/healthz", healthHandler);
  app.server.get("/metrics", createMetricsHandler(app));
  app.server.get("/reset", createResetHandler(app));
}
