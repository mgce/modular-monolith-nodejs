import { asFunction, asValue, asClass, AwilixContainer, createContainer, Resolver } from "awilix";
import { Router } from "express";
import { DbConnection } from "@travelhoop/infrastructure-types";
import { RedisClient as Redis } from "redis";
import { InMemoryEventDispatcher } from "../event/event.dispatcher";
import { registerAsArray } from "./as-array";
import { createLogger } from "../logger";
import { MessageBroker, RedisMessageDispatcher } from "../messaging";
import { RedisClient } from "../redis/redis.queue";

export class ContainerBuilder {
  private container: AwilixContainer;

  constructor() {
    this.container = createContainer();
  }

  addRouting(createRouter: () => Router) {
    this.container.register({
      router: asFunction(createRouter),
    });

    return this;
  }

  addDbConnection(dbConnection: DbConnection) {
    this.container.register({
      dbConnection: asValue(dbConnection),
    });

    return this;
  }

  addRedis(redis: Redis) {
    this.container.register({
      redis: asValue(redis),
    });

    return this;
  }

  addCommon() {
    this.container.register({
      logger: asValue(createLogger()),
    });

    return this;
  }

  addEventSubscribers(eventSubscribers: any[]) {
    this.container.register({
      eventDispatcher: asClass(InMemoryEventDispatcher),
      queueClient: asClass(RedisClient),
      messageDispatcher: asClass(RedisMessageDispatcher),
      messageBroker: asClass(MessageBroker),
    });

    this.container.register({
      eventSubscribers: registerAsArray<any>(
        eventSubscribers.map(eventSubscriber => asClass(eventSubscriber as any).scoped()),
      ),
    });

    return this;
  }

  register(entries: Record<string, Resolver<any>>) {
    this.container.register(entries);

    return this;
  }

  get router(): Router {
    return this.container.resolve("router");
  }

  build() {
    return this.container;
  }
}
