import { Request, Response, NextFunction } from "express";
import type { router } from "../config.js";

export function createMetricsHandler(app: router) {
  return function metricsHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    res.set("Content-Type", "text/html");
    res.send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${app.apiConfig.fileserverHits} times!</p>
  </body>
</html>`);
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

export function healthHandler(req: Request, res: Response): void {
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("OK");
}
