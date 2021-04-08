import { Application } from "express";
import { DbConnection } from "../database/db-connection";

export interface AppModule {
  basePath: string;
  name: string;
  path: string;
  use: (app: Application, dbConnection: DbConnection) => void;
}
