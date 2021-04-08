import express from "express";
import { Application } from "express";
import { loadModules } from "./module.loader";
import { MiddlewareType } from "./shared/types/middleware.type";

interface AppDependencies {
  errorHandler: MiddlewareType;
}

export const createApp = ({ errorHandler }: AppDependencies): Application => {
  const modules = loadModules();
  const app = express();

  app.use(express.json());

  modules.forEach(m => m.use(app));

  app.get("/", (_req, res) => {
    res.json("test");
  });

  app.use(errorHandler);

  return app;
};
