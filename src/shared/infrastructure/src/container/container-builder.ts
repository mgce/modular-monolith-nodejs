import { asFunction, AwilixContainer, createContainer } from "awilix";
import { Router } from "express";

export class ContainerBuilder {
  private container: AwilixContainer;

  constructor() {
    this.container = createContainer();
  }

  addRouting(createRouter: (params: any) => Router, routes: Record<string, (params: any) => Router>) {
    Object.keys(routes).forEach(routeName => {
      this.container.register({
        [routeName]: asFunction(routes[routeName]),
      });
    });

    this.container.register({
      router: asFunction(createRouter),
    });

    return this;
  }

  get register() {
    return this.container.register;
  }

  get router(): Router {
    return this.container.resolve("router");
  }

  build() {
    return this.container;
  }
}
