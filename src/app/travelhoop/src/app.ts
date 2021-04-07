import express from "express";
import { Application } from "express";
import { loadModules } from "./module.loader";

export const createApp = (): Application => {
  const modules = loadModules();
  const app = express();

  modules.forEach(m => m.use(app));

  app.get("/", (_req, res) => {
    res.json("test");
  });

  return app;
};
