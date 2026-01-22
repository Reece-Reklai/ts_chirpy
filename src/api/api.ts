import express from "express";
import { Request, Response, NextFunction } from "express";

export async function handlerValidateChirp(req: Request, res: Response) {
  let body = ""; // 1. Initialize

  // 2. Listen for data events
  req.on("data", (chunk) => {
    body += chunk;
  });

  // 3. Listen for end events
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      if (parsedBody.body.length > 140) {
        res.status(400).send({ error: "Chirp is too long" });
      }
    } catch (error) {
      res.status(400).send({ error: "Something went wrong" });
    }
  });
}

// encode json back to client
async function handlerEncodingJson(req: Request, res: Response) {
  type responseData = {
    createdAt: string;
    ID: number;
  };

  const respBody: responseData = {
    createdAt: new Date().toISOString(),
    ID: 123,
  };

  res.header("Content-Type", "application/json");
  const body = JSON.stringify(respBody);
  res.status(200).send(body);
}
