import { asFunction, asValue, asClass, AwilixContainer, createContainer, Resolver } from "awilix";
import { Router } from "express";
import { DbConnection } from "@travelhoop/infrastructure-types";
import { RedisClient as Redis } from "redis";
import { CommandDispatcher } from "../command/command-bus";
import { InMemoryEventDispatcher } from "../event/event.dispatcher";
import { registerAsArray } from "./as-array";
import { createLogger } from "../logger";
import { MessageBroker, RedisMessageDispatcher } from "../messaging";
import { RedisClient } from "../redis/redis.queue";
import { auth } from "..";

export class ContainerBuilder {
  private container: AwilixContainer;

  constructor() {
    this.container = createContainer();
  }

  addRouting(createRouter: (deps: any) => Router) {
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

  addAuth({ secretKey }: { secretKey: string }) {
    this.container.register({
      secretKey: asValue(secretKey),
      auth: asFunction(auth),
    });

    return this;
  }

  addCommandHandlers({ commandHandlers }: { commandHandlers: any[] }) {
    this.container.register({
      commandDispatcher: asClass(CommandDispatcher),
    });

    if (commandHandlers) {
      this.container.register({
        commandHandlers: registerAsArray<any>(
          commandHandlers.map(commandHandler => asClass(commandHandler as any).scoped()),
        ),
      });
    }

    return this;
  }

  addEventSubscribers({
    eventSubscribers,
    messageBrokerQueueName,
  }: {
    messageBrokerQueueName: string;
    eventSubscribers?: any[];
  }) {
    this.container.register({
      messageBrokerQueueName: asValue(messageBrokerQueueName),
      eventDispatcher: asClass(InMemoryEventDispatcher),
      queueClient: asClass(RedisClient),
      messageDispatcher: asClass(RedisMessageDispatcher),
      messageBroker: asClass(MessageBroker),
    });

    if (eventSubscribers) {
      this.container.register({
        eventSubscribers: registerAsArray<any>(
          eventSubscribers.map(eventSubscriber => asClass(eventSubscriber as any).scoped()),
        ),
      });
    }

    return this;
  }

  register(entries: Record<string, Resolver<any>>) {
    this.container.register(entries);

    return this;
  }

  build() {
    return this.container;
  }
}
