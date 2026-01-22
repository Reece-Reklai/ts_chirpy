import { respondWithJSON } from "./router.js";
export function handlerValidateChirp(req, res) {
    let body = "";
    let payload = {};
    // 2. Listen for data events
    req.on("data", (chunk) => {
        body += chunk;
    });
    // 3. Listen for end events
    req.on("end", () => {
        try {
            const parsedBody = JSON.parse(body);
            if (parsedBody.body.length > 140) {
                payload.error = "Chirp is too long";
            }
        }
        catch (error) {
            payload.error = "Something went wrong";
        }
        if (typeof payload.error === "undefined") {
            payload.valid = true;
            respondWithJSON(res, 200, payload);
            return;
        }
        respondWithJSON(res, 400, payload);
    });
}
