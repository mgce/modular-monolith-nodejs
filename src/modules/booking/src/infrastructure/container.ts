import { asClass, AwilixContainer } from "awilix";
import { ContainerBuilder, StandardCreateContainerDependencies } from "@travelhoop/infrastructure";
import { createRouter } from "../api/routes/router";
import { bookingModuleConfigFactory } from "./config";
import { MikroOrmBookableCouchRepository } from "./mikro-orm/repositories/bookable-couch.repository";
import { CouchCreatedSubscriber } from "../application/bookable-couch/subscribers/couch-created.subscriber";
import { RequestCouchBookingCommandHandler } from "../application/couch-booking-request/handlers/request-couch-booking/request-couch-booking.handler";
import { MikroOrmCouchBookingRequestRepository } from "./mikro-orm/repositories/couch-booking-request.repository";
import { CouchBookingRequestDomainService } from "../domain";
import { CouchBookingCreatedSubscriber } from "../application/couch-booking-request/subscribers/couch-booking-created.subscriber";
import { MikroOrmBookingCancellationRepository } from "./mikro-orm/repositories/booking-cancellation.repository";

export const createContainer = ({ dbConnection, redis }: StandardCreateContainerDependencies): AwilixContainer<any> => {
  const config = bookingModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .register({
      bookableCouchRepository: asClass(MikroOrmBookableCouchRepository),
      couchBookingRequestRepository: asClass(MikroOrmCouchBookingRequestRepository),
      bookingCancellationRepository: asClass(MikroOrmBookingCancellationRepository),
      couchBookingRequestDomainService: asClass(CouchBookingRequestDomainService),
    })
    .addRouting(createRouter)
    .addAuth({ secretKey: config.jwt.secretKey })
    .addRedis(redis)
    .addDbConnection(dbConnection)
    .addCommandHandlers({ commandHandlers: [RequestCouchBookingCommandHandler] })
    .addEventSubscribers({
      messageBrokerQueueName: config.queues.messageBroker,
      eventSubscribers: [CouchCreatedSubscriber, CouchBookingCreatedSubscriber],
    })
    .build();
};
