import { ContainerBuilder, StandardCreateContainerDependencies } from "@travelhoop/infrastructure";
import { asClass, asValue } from "awilix";
import { userModuleConfigFactory } from "../core/config";
import { UserCreatedSubscriber } from "../core/subscribers/user-created.subscriber";
import { CouchRepository } from "../core/repositories/couch.repository";
import { HostRepository } from "../core/repositories/host.repository";
import { CouchService } from "../core/services/couch.service";
import { createRouter } from "./routes/router";

export const createContainer = ({ dbConnection, redis }: StandardCreateContainerDependencies) => {
  const config = userModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .register({
      messageBrokerQueueName: asValue(config.queues.messageBroker),
    })
    .addRedis(redis)
    .addRouting(createRouter)
    .addDbConnection(dbConnection)
    .addEventSubscribers([UserCreatedSubscriber])
    .register({
      couchService: asClass(CouchService),
      hostRepository: asClass(HostRepository),
      couchRepository: asClass(CouchRepository),
    })
    .build();
};
