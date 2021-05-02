import { DomainEvent } from "./domain.event";

export interface DomainEventDispatcher {
  dispatch(events: DomainEvent<unknown>[]): Promise<void>;
  dispatch(event: DomainEvent<unknown>): Promise<void>;
}
