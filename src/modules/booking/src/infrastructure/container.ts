import { asClass, AwilixContainer } from "awilix";
import { ContainerBuilder, StandardCreateContainerDependencies } from "@travelhoop/infrastructure";
import { createRouter } from "../api/routes/router";
import { bookingModuleConfigFactory } from "./config";
import { MikroOrmBookableCouchRepository } from "./mikro-orm/repositories/bookable-couch.repository";
import { CouchCreatedSubscriber } from "../application/bookable-couch/subscribers/couch-created.subscriber";
import { RequestCouchBookingCommandHandler } from "../application/bookable-couch/handlers/request-couch-booking/request-couch-booking.handler";

export const createContainer = ({ dbConnection, redis }: StandardCreateContainerDependencies): AwilixContainer<any> => {
  const config = bookingModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .register({
      bookableCouchRepository: asClass(MikroOrmBookableCouchRepository),
    })
    .addRouting(createRouter)
    .addAuth({ secretKey: config.jwt.secretKey })
    .addRedis(redis)
    .addDbConnection(dbConnection)
    .addCommandHandlers({ commandHandlers: [RequestCouchBookingCommandHandler] })
    .addEventSubscribers({
      messageBrokerQueueName: config.queues.messageBroker,
      eventSubscribers: [CouchCreatedSubscriber],
    })
    .build();
};
