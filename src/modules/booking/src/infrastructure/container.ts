import { ContainerBuilder, StandardCreateContainerDependencies } from "@travelhoop/infrastructure";
import { bookingModuleConfigFactory } from "./config";

export const createContainer = ({ dbConnection, redis }: StandardCreateContainerDependencies) => {
  const config = bookingModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .addAuth({ secretKey: config.jwt.secretKey })
    .addRedis(redis)
    .addDbConnection(dbConnection)
    .addEventSubscribers({
      messageBrokerQueueName: config.queues.messageBroker,
      eventSubscribers: [],
    })
    .build();
};
