import { standardAppModuleFactory } from "@travelhoop/infrastructure";
import { createContainer } from "./container";

export const userModule = standardAppModuleFactory({ basePath: "user", name: "user-module", createContainer });
