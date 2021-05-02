export interface DomainEventSubscribersMeta<T = any> {
  name: string;
  method: keyof T & string;
}

export interface DomainEventSubscriber {
  getSubscribedEvents(): DomainEventSubscribersMeta[];
}
