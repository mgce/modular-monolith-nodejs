import { AppModule } from "@travelhoop/infrastructure-types";
import { Application } from "express";
import { createContainer } from "./container";

export const BASE_PATH = "user";

export class UserModule implements AppModule {
  basePath: string = `/${BASE_PATH}`;

  name: string = "user-module";

  path: string = this.basePath;

  use(app: Application) {
    const container = createContainer();

    app.use(this.path, container.router);
  }
}
