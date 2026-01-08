import { Express } from "express";

type apiConfig = {
  fileserverHits: number;
};

export const apiConfig: apiConfig = {
  fileserverHits: 0,
};

export type router = {
  apiConfig: apiConfig;
  server: Express;
};
