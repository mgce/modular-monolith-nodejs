import { ContainerBuilder, StandardCreateContainerDependencies } from "@travelhoop/infrastructure";
import { asClass } from "awilix";
import { userModuleConfigFactory } from "../core/config";
import { CouchRepository } from "../core/repositories/couch.repository";
import { CouchService } from "../core/services/couch.service";
import { createRouter } from "./routes/router";

export const createContainer = ({ dbConnection, redis }: StandardCreateContainerDependencies) => {
  const config = userModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .addAuth({ secretKey: config.jwt.secretKey })
    .addRedis(redis)
    .addRouting(createRouter)
    .addDbConnection(dbConnection)
    .addEventSubscribers({
      messageBrokerQueueName: config.queues.messageBroker,
      eventSubscribers: [],
    })
    .register({
      couchService: asClass(CouchService),
      couchRepository: asClass(CouchRepository),
    })
    .build();
};
