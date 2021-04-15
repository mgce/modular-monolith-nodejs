import { ContainerBuilder } from "@travelhoop/infrastructure";
import { UseDependencies } from "@travelhoop/infrastructure-types";
import { asClass, asValue } from "awilix";
import { userModuleConfigFactory } from "../core/config";
import { ProfileRepository } from "../core/repositories/profile.repository";
import { UserRepository } from "../core/repositories/user.repository";
import { AuthService } from "../core/services/auth.service";
import { PasswordManager } from "../core/services/password-hasher";
import { UserService } from "../core/services/user.service";
import { UserCreatedSubscriber } from "../core/subscribers/user-created.subscriber";
import { createRouter } from "./routes/router";

interface CreateContainerDependencies extends UseDependencies {}

export const createContainer = ({ dbConnection, redis }: CreateContainerDependencies) => {
  const config = userModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .register({
      secretKey: asValue(config.jwt.secretKey),
      expiry: asValue(config.jwt.expiry),
      messageBrokerQueueName: asValue(config.queues.messageBroker),
    })
    .addRedis(redis)
    .addRouting(createRouter)
    .addDbConnection(dbConnection)
    .addEventSubscribers([UserCreatedSubscriber])
    .register({
      passwordManager: asClass(PasswordManager),
      authService: asClass(AuthService),
      userService: asClass(UserService),
      userRepository: asClass(UserRepository),
      profileRepository: asClass(ProfileRepository),
    });
};
