export async function handlerValidateChirp(req, res) {
    let body = ""; // 1. Initialize
    // 2. Listen for data events
    req.on("data", (chunk) => {
        body += chunk;
    });
    // 3. Listen for end events
    req.on("end", () => {
        try {
            const parsedBody = JSON.parse(body);
        }
        catch (error) {
            res.status(400).send({ error: "Something went wrong" });
        }
    });
}
// encode json back to client
async function handlerEncodingJson(req, res) {
    const respBody = {
        createdAt: new Date().toISOString(),
        ID: 123,
    };
    res.header("Content-Type", "application/json");
    const body = JSON.stringify(respBody);
    res.status(200).send(body);
}
