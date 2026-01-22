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
