import { ContainerBuilder } from "@travelhoop/infrastructure";
import { asClass, asValue } from "awilix";
import { DbConnection } from "@travelhoop/infrastructure-types";
import { createRouter } from "./routes/router";
import { UserService } from "../core/services/user.service";
import { UserRepository } from "../core/repositories/user.repository";
import { PasswordManager } from "../core/services/password-hasher";
import { userModuleConfigFactory } from "../core/config";
import { AuthService } from "../core/services/auth.service";

interface CreateContainerDependencies {
  dbConnection: DbConnection;
}

export const createContainer = ({ dbConnection }: CreateContainerDependencies) => {
  const config = userModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addRouting(createRouter)
    .addDbConnection(dbConnection)
    .register({
      secretKey: asValue(config.jwt.secretKey),
      expiry: asValue(config.jwt.expiry),
    })
    .register({
      passwordManager: asClass(PasswordManager),
      authService: asClass(AuthService),
      userService: asClass(UserService),
      userRepository: asClass(UserRepository),
    });
};
