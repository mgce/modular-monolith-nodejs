import { Application } from "express";

export interface AppModule {
  basePath: string;
  name: string;
  path: string;
  use: (app: Application) => void;
}
