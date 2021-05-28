import { standardAppModuleFactory } from "@travelhoop/infrastructure";
import { createContainer } from "./container";

export const reviewModule = standardAppModuleFactory({
  basePath: "review",
  name: "review-module",
  createContainer,
});
