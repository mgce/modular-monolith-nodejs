import { scopePerRequest } from "@travelhoop/infrastructure";
import { AppModule, UseDependencies, Event, EventDispatcher } from "@travelhoop/infrastructure-types";
import { AwilixContainer } from "awilix";
import { Application } from "express";
import { createContainer } from "./container";

export const BASE_PATH = "user";

export class UserModule implements AppModule {
  basePath: string = `/${BASE_PATH}`;

  name: string = "user-module";

  path: string = this.basePath;

  private container: AwilixContainer;

  use(app: Application, { dbConnection, redis }: UseDependencies) {
    const container = createContainer({ dbConnection, redis });

    this.container = container.build();

    app.use(scopePerRequest(this.basePath, this.container));
    app.use(this.path, container.router);
  }

  async dispatchEvent(event: Event): Promise<void> {
    await this.container.resolve<EventDispatcher>("eventDispatcher").dispatch(event);
  }
}
