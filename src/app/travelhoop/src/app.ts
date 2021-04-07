import express from "express";
import { Application } from "express";
import { UserModule } from "@travelhoop/user-module";

export const createApp = (): Application => {
  const userModule = new UserModule();
  const app = express();

  userModule.use(app);

  app.get("/", (_req, res) => {
    res.json("test");
  });

  return app;
};
