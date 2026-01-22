import express from "express";
import { middlewareLogResponses, createMiddlewareMetrics, } from "./middleware.js";
import { createMetricsHandler, createResetHandler, healthHandler, } from "./admin.js";
import { handlerValidateChirp } from "./api.js";
// encode json back to client
export function respondWithJSON(res, code, payload) {
    res.header("Content-Type", "application/json");
    const body = JSON.stringify(payload);
    res.status(code).send(body);
}
export function registerRoutes(app) {
    // Apply the middleware to all routes
    // app.server.use(middlewareLogResponses, createMiddlewareMetrics(app));
    // Routing Path
    // app
    app.server.use("/app", middlewareLogResponses, createMiddlewareMetrics(app), express.static("./src/app"));
    // api
    app.server.post("/api" + "/validate_chirp", handlerValidateChirp);
    // admin
    app.server.get("/admin" + "/healthz", healthHandler);
    app.server.get("/admin" + "/metrics", createMetricsHandler(app));
    app.server.post("/admin" + "/reset", createResetHandler(app));
}
