export interface EventSubscribersMeta<T = any> {
  name: string;
  method: keyof T & string;
}

export interface EventSubscriber {
  getSubscribedEvents(): EventSubscribersMeta[];
}
