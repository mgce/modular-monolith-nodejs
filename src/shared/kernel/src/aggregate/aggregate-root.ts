import { AggregateId } from "./aggregate-id";
import { DomainEvent } from "./domain.event";

export class AggregateRoot<T = AggregateId> {
  public id: T;

  public version: number = 1;

  private domainEvents: DomainEvent<unknown>[] = [];

  private versionIncremented: boolean;

  addEvent(event: DomainEvent<unknown>) {
    if (!this.domainEvents && !this.versionIncremented) {
      this.incrementVersion();
    }

    this.domainEvents.push(event);
  }

  clearEvents() {
    this.domainEvents = [];
  }

  get events(): DomainEvent<unknown>[] {
    return this.domainEvents;
  }

  private incrementVersion() {
    if (!this.versionIncremented) {
      this.version += 1;
      this.versionIncremented = true;
    }
  }
}
