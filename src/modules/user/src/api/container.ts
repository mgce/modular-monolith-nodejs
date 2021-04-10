import { ContainerBuilder } from "@travelhoop/infrastructure";
import { asClass } from "awilix";
import { DbConnection } from "@travelhoop/infrastructure-types";
import { createRouter } from "./routes/router";
import { UserService } from "../core/services/user.service";
import { UserRepository } from "../core/repositories/user.repository";

interface CreateContainerDependencies {
  dbConnection: DbConnection;
}

export const createContainer = ({ dbConnection }: CreateContainerDependencies) =>
  new ContainerBuilder()
    .addRouting(createRouter)
    .addDbConnection(dbConnection)
    .register({
      userService: asClass(UserService),
      userRepository: asClass(UserRepository),
    });
