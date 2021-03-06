import { ContainerBuilder, StandardCreateContainerDependencies } from "@travelhoop/infrastructure";
import { asClass, asValue } from "awilix";
import { userModuleConfigFactory } from "../core/config";
import { ProfileRepository } from "../core/repositories/profile.repository";
import { UserRepository } from "../core/repositories/user.repository";
import { AuthService } from "../core/services/auth.service";
import { PasswordManager } from "../core/services/password-hasher";
import { UserService } from "../core/services/user.service";
import { UserCreatedSubscriber } from "../core/subscribers/user-created.subscriber";
import { createRouter } from "./routes/router";

export const createContainer = ({ dbConnection, redis }: StandardCreateContainerDependencies) => {
  const config = userModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .register({
      expiry: asValue(config.jwt.expiry),
    })
    .addAuth({ secretKey: config.jwt.secretKey })
    .addRedis(redis)
    .addRouting(createRouter)
    .addDbConnection(dbConnection)
    .addEventSubscribers({
      messageBrokerQueueName: config.queues.messageBroker,
      eventSubscribers: [UserCreatedSubscriber],
    })
    .register({
      passwordManager: asClass(PasswordManager),
      authService: asClass(AuthService),
      userService: asClass(UserService),
      userRepository: asClass(UserRepository),
      profileRepository: asClass(ProfileRepository),
    })
    .build();
};
