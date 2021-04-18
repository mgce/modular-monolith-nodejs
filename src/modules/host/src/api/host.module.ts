import { standardAppModuleFactory } from "@travelhoop/infrastructure";
import { createContainer } from "./container";

export const hostModule = standardAppModuleFactory({
  basePath: "host",
  name: "host-module",
  createContainer,
});
