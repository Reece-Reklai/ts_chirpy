import { Request, Response, NextFunction } from "express";
import { apiConfig, type router } from "../config.js";

export function createMiddlewareMetrics(app: router) {
  return function middlewareMetricsInc(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.on("finish", () => {
      app.apiConfig.fileserverHits = app.apiConfig.fileserverHits + 1;
    });
    next();
  };
}

export function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.on("finish", () => {
    let statusCode = res.statusCode;
    if (statusCode != 200) {
      console.log(`[NON-OK] ${req.method} ${req.path} - Status: ${statusCode}`);
    }
  });
  next();
}

export function healthHandler(req: Request, res: Response): void {
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("OK");
}

export function createMetricsHandler(app: router) {
  return function metricsHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(`Hits ${app.apiConfig.fileserverHits}`);
    next();
  };
}

export function createResetHandler(app: router) {
  return function resetHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    app.apiConfig.fileserverHits = 0;
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
    next();
  };
}
