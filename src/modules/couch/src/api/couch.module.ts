import { standardAppModuleFactory } from "@travelhoop/infrastructure";
import { createContainer } from "./container";

export const couchModule = standardAppModuleFactory({
  basePath: "couch",
  name: "couch-module",
  createContainer,
});
