import { AppModule } from "@travelhoop/shared-infrastructure";
import { Application } from "express";
import { createContainer } from "./container";

export const BASE_PATH = "user";

export class UserModule implements AppModule {
  basePath: string = BASE_PATH;

  name: string = "user-module";

  path: string = this.basePath;

  register() {}

  use(app: Application) {
    const container = createContainer();

    app.use("/user", container.router);
  }
}
