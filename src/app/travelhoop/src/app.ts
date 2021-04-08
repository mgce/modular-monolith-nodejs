import { AppModule } from "@travelhoop/infrastructure-types";
import express, { Application } from "express";
import { DbConnection } from "@travelhoop/infrastructure-types";
import { MiddlewareType } from "./shared/types/middleware.type";

interface AppDependencies {
  errorHandler: MiddlewareType;
  modules: AppModule[];
  dbConnection: DbConnection;
}

export const createApp = ({ errorHandler, modules, dbConnection }: AppDependencies): Application => {
  const app = express();

  app.use(express.json());

  modules.forEach(m => m.use(app, dbConnection));

  app.get("/", (_req, res) => {
    res.json("Travelhoop!");
  });

  app.use(errorHandler);

  return app;
};
