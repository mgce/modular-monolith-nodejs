import { Event, EventDispatcher, Logger, EventSubscriber } from "@travelhoop/infrastructure-types";

export type Subscriber = (event: Event) => Promise<void>;

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

  public async dispatch(event: Event) {
    this.logger.debug(`Dispatching event ${event.constructor.name}@${JSON.stringify(event.payload)}`);

    const promises = this.subscribers
      .filter(s => s.name === event.constructor.name)
      .map(({ subscriber }) =>
        subscriber(event).catch(e =>
          this.logger.debug(`Subscriber failed to handle event ${event.constructor.name}`, e),
        ),
      );

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
