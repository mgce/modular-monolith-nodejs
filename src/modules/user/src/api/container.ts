import { ContainerBuilder } from "@travelhoop/infrastructure";
import { asClass } from "awilix";
import { DbConnection } from "@travelhoop/infrastructure-types";
import { createRouter } from "./routes/router";
import { AuthService } from "../core/services/auth.service";
import { UserRepository } from "../core/repositories/user.repository";

interface CreateContainerDependencies {
  dbConnection: DbConnection;
}

export const createContainer = ({ dbConnection }: CreateContainerDependencies) =>
  new ContainerBuilder()
    .addRouting(createRouter)
    .addDbConnection(dbConnection)
    .register({
      authService: asClass(AuthService),
      userRepository: asClass(UserRepository),
    });
