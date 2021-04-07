import { ContainerBuilder } from "@travelhoop/infrastructure";
import { createRouter } from "./routes/router";
import { userRouting } from "./routes/user.router";

export const createContainer = () => new ContainerBuilder().addRouting(createRouter, { userRouting });
