import { Request, Response, NextFunction } from "express";
import { apiConfig, type router } from "../config.js";

export function createMiddlewareMetrics(app: router) {
  return function middlewareMetricsInc(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.on("finish", () => {
      app.apiConfig.fileserverHits += 1;
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
