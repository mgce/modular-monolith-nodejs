import { AggregateId } from "./aggregate-id";

interface DomainEvent {
  payload: object;
}

export class AggregateRoot<T = AggregateId> {
  public id: T;

  public version: number = 1;

  private domainEvents: DomainEvent[] = [];

  private versionIncremented: boolean;

  addEvent(event: DomainEvent) {
    if (!this.domainEvents && !this.versionIncremented) {
      this.incrementVersion();
    }

    this.domainEvents.push(event);
  }

  clearEvents() {
    this.domainEvents = [];
  }

  get events(): ReadonlyArray<DomainEvent> {
    return this.domainEvents;
  }

  private incrementVersion() {
    if (!this.versionIncremented) {
      this.version += 1;
      this.versionIncremented = true;
    }
  }
}
