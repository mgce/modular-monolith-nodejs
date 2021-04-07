import { Application } from "express";

export interface AppModule {
  basePath: string;
  name: string;
  path: string;
  register: () => void;
  use: (app: Application) => void;
}
