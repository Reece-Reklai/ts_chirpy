import express from "express";
import { middlewareLogResponses, createMiddlewareMetrics, healthHandler, createMetricsHandler, createResetHandler, } from "./middleware.js";
export function registerRoutes(app) {
    app.server.use(middlewareLogResponses, createMiddlewareMetrics(app));
    app.server.use("/app", express.static("./src/app"));
    app.server.get("/healthz", healthHandler);
    app.server.get("/metrics", createMetricsHandler(app));
    app.server.get("/reset", createResetHandler(app));
}
