import { AppModule, Event, EventDispatcher, UseDependencies } from "@travelhoop/infrastructure-types";
import { AwilixContainer } from "awilix";
import { Application, Router } from "express";
import { scopePerRequest } from "../container";

export interface StandardCreateContainerDependencies extends UseDependencies {}

export interface StandardAppModuleFactoryDependencies {
  basePath: string;
  name: string;
  createContainer: (deps: StandardCreateContainerDependencies) => AwilixContainer;
}

const basePathFactory = (basePath: string) => `/${basePath.replace("/", "")}`;

export const standardAppModuleFactory = ({
  basePath,
  name,
  createContainer,
}: StandardAppModuleFactoryDependencies): AppModule => {
  const path = basePathFactory(basePath);
  let container: AwilixContainer;
  return {
    basePath: path,
    path,
    name,
    use: (app: Application, { dbConnection, redis }: UseDependencies) => {
      container = createContainer({ dbConnection, redis });
      app.use(scopePerRequest(path, container));
      app.use(path, container.resolve<Router>("router"));
    },
    dispatchEvent: async (event: Event): Promise<void> => {
      await container.resolve<EventDispatcher>("eventDispatcher").dispatch(event);
    },
  };
};
