export function createMiddlewareMetrics(app) {
    return function middlewareMetricsInc(req, res, next) {
        res.on("finish", () => {
            app.apiConfig.fileserverHits += 1;
        });
        next();
    };
}
export function middlewareLogResponses(req, res, next) {
    res.on("finish", () => {
        let statusCode = res.statusCode;
        if (statusCode != 200) {
            console.log(`[NON-OK] ${req.method} ${req.path} - Status: ${statusCode}`);
        }
    });
    next();
}
export function healthHandler(req, res) {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
}
export function createMetricsHandler(app) {
    return function metricsHandler(req, res, next) {
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
export function createResetHandler(app) {
    return function resetHandler(req, res, next) {
        app.apiConfig.fileserverHits = 0;
        res.set("Content-Type", "text/plain; charset=utf-8");
        res.send("OK");
        next();
    };
}
