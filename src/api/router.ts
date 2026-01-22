import express from "express";
import type { router } from "../config.js";
import {
  middlewareLogResponses,
  createMiddlewareMetrics,
} from "./middleware.js";
import {
  createMetricsHandler,
  createResetHandler,
  healthHandler,
} from "./admin.js";
import { handlerValidateChirp } from "./api.js";

export function registerRoutes(app: router) {
  // Apply the middleware to all routes
  // app.server.use(middlewareLogResponses, createMiddlewareMetrics(app));
  // Routing Path
  // app
  app.server.use(
    "/app",
    middlewareLogResponses,
    createMiddlewareMetrics(app),
    express.static("./src/app"),
  );
  // api
  app.server.post("/api" + "/validate_chirp", handlerValidateChirp);
  // admin
  app.server.get("/admin" + "/healthz", healthHandler);
  app.server.get("/admin" + "/metrics", createMetricsHandler(app));
  app.server.post("/admin" + "/reset", createResetHandler(app));
}
