import express from "express";
import { routing } from "../index.js";
import { healthHandler } from "./admin.js";
import { middlewareMetricsInc, middlewareLogResponses, } from "../api/middleware.js";
routing.server.use("/app", middlewareMetricsInc, middlewareLogResponses, express.static("./src/app"));
routing.server.get("/healthz", healthHandler);
