import { AppModule, DbConnection } from "@travelhoop/infrastructure-types";
import { scopePerRequest } from "@travelhoop/infrastructure";
import { Application } from "express";
import { createContainer } from "./container";

export const BASE_PATH = "user";

export class UserModule implements AppModule {
  basePath: string = `/${BASE_PATH}`;

  name: string = "user-module";

  path: string = this.basePath;

  use(app: Application, dbConnection: DbConnection) {
    const container = createContainer({ dbConnection });

    app.use(scopePerRequest(this.basePath, container.build()));
    app.use(this.path, container.router);
  }
}
