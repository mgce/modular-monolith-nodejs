import { Event, EventDispatcher, Logger, EventSubscriber } from "@travelhoop/abstract-core";

type Subscriber = (event: Event) => Promise<void>;

type Subscribers = { name: string; subscriber: Subscriber };

interface InMemoryEventDispatcherDependencies {
  logger: Logger;
  eventSubscribers: EventSubscriber[];
}

export class InMemoryEventDispatcher implements EventDispatcher {
  private logger: Logger;

  private subscribers: Subscribers[] = [];

  constructor({ logger, eventSubscribers }: InMemoryEventDispatcherDependencies) {
    if (eventSubscribers) {
      this.addSubscribers(eventSubscribers);
    }

    this.logger = logger;
  }

  public async dispatch(event: Event | Event[]) {
    const events = event instanceof Array ? event : [event];

    const eventNames = events.map(e => e.name);

    const promises = this.subscribers
      .filter(s => eventNames.includes(s.name))
      .map(({ subscriber, name: eventName }) => {
        const subscribedEvent = events.find(e => e.name === eventName);

        if (!subscribedEvent) {
          throw new Error(`There is no subscriber for ${eventName} event`);
        }

        return subscriber(subscribedEvent).catch(e =>
          this.logger.debug(`Subscriber failed to handle event ${eventName}`, e),
        );
      });

    if (promises.length) {
      this.logger.debug(`Dispatching events ${eventNames.join(", ")}@${JSON.stringify(events)}`);
    }

    await Promise.all(promises);
  }

  private addSubscribers(subscribers: EventSubscriber[]) {
    subscribers.forEach(subscriber => this.addSubscriber(subscriber));
  }

  private addSubscriber(subscriber: EventSubscriber) {
    if (subscriber.getSubscribedEvents().length === 0) {
      return;
    }

    const subscribers = subscriber.getSubscribedEvents().map(({ name, method }) => ({
      name,
      subscriber: (subscriber as any)[method].bind(subscriber),
    }));

    this.subscribers.push(...subscribers);
  }
}
