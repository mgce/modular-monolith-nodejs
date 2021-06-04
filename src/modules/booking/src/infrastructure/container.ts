import { ContainerBuilder, StandardCreateContainerDependencies } from "@travelhoop/infrastructure";
import { asClass, AwilixContainer } from "awilix";
import { createRouter } from "../api/routes/router";
import { CancelBookingCommandHandler } from "../application/bookable-couch/handlers/cancel-booking/cancel-booking.handler";
import { CreateBookingCommandHandler } from "../application/bookable-couch/handlers/create-booking/create-booking.handler";
import { FinishBookingsCommandHandler } from "../application/bookable-couch/handlers/finish-bookings/finish-bookings.handler";
import { CouchCreatedSubscriber } from "../application/bookable-couch/subscribers/couch-created.subscriber";
import { RejectCouchBookingRequestCommandHandler } from "../application/couch-booking-request/handlers/reject-couch-booking-request/reject-couch-booking-request.handler";
import { RequestCouchBookingCommandHandler } from "../application/couch-booking-request/handlers/request-couch-booking/request-couch-booking.handler";
import { CouchBookingCreatedSubscriber } from "../application/couch-booking-request/subscribers/couch-booking-created.subscriber";
import { CouchBookingRequestDomainService } from "../domain";
import { bookingModuleConfigFactory } from "./config";
import { MikroOrmBookableCouchRepository } from "./mikro-orm/repositories/bookable-couch.repository";
import { MikroOrmBookingCancellationRepository } from "./mikro-orm/repositories/booking-cancellation.repository";
import { MikroOrmCouchBookingRequestRepository } from "./mikro-orm/repositories/couch-booking-request.repository";

export const createContainer = ({ dbConnection, redis }: StandardCreateContainerDependencies): AwilixContainer<any> => {
  const config = bookingModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .addSecurityTokens({ schedulerToken: config.securityTokens.schedulerToken })
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
    .addCommandHandlers({
      commandHandlers: [
        RequestCouchBookingCommandHandler,
        RejectCouchBookingRequestCommandHandler,
        CancelBookingCommandHandler,
        CreateBookingCommandHandler,
        FinishBookingsCommandHandler,
      ],
    })
    .addEventSubscribers({
      messageBrokerQueueName: config.queues.messageBroker,
      eventSubscribers: [CouchCreatedSubscriber, CouchBookingCreatedSubscriber],
    })
    .build();
};
