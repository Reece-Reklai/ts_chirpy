import express from "express";
import { router, apiConfig } from "./config.js";
import { registerRoutes } from "./api/router.js";

const app = express();
const PORT = 8080;

export const routing: router = {
  apiConfig: apiConfig,
  server: app,
};

registerRoutes(routing);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
