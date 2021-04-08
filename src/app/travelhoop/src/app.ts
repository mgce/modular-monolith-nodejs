import { AppModule } from "@travelhoop/infrastructure-types";
import express, { Application } from "express";
import { MiddlewareType } from "./shared/types/middleware.type";

interface AppDependencies {
  errorHandler: MiddlewareType;
  modules: AppModule[];
}

export const createApp = ({ errorHandler, modules }: AppDependencies): Application => {
  const app = express();

  app.use(express.json());

  modules.forEach(m => m.use(app));

  app.get("/", (_req, res) => {
    res.json("test");
  });

  app.use(errorHandler);

  return app;
};
