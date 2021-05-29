import { ContainerBuilder, StandardCreateContainerDependencies } from "@travelhoop/infrastructure";
import { asClass } from "awilix";
import { reviewModuleConfigFactory } from "../core/config";
import { BookingReviewRepository } from "../core/repositories/booking-review.repository";
import { BookingReviewService } from "../core/services/booking-review.service";
import { BookingFinishedSubscriber } from "../core/subscribers/booking-finished.subscriber";
import { createRouter } from "./routes/router";

export const createContainer = ({ dbConnection, redis }: StandardCreateContainerDependencies) => {
  const config = reviewModuleConfigFactory(process.env as any);
  return new ContainerBuilder()
    .addCommon()
    .addAuth({ secretKey: config.jwt.secretKey })
    .addRedis(redis)
    .addRouting(createRouter)
    .addDbConnection(dbConnection)
    .addEventSubscribers({
      messageBrokerQueueName: config.queues.messageBroker,
      eventSubscribers: [BookingFinishedSubscriber],
    })
    .register({
      bookingReviewService: asClass(BookingReviewService),
      bookingReviewRepository: asClass(BookingReviewRepository),
    })
    .build();
};
