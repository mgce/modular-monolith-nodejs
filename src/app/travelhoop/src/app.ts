import express from "express";
import { Application } from "express";

export const createApp = (): Application => {
  const app = express();

  return app;
};
