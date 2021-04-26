import { AggregateId } from "./aggregate-id";

interface DomainEvent {
  payload: object;
}

export class AggregateRoot<T = AggregateId> {
  public id: T;

  public version: number;

  private events: DomainEvent[];

  private versionIncremented: boolean;

  addEvent(event: DomainEvent) {
    if (!this.events.length && !this.versionIncremented) {
      this.incrementVersion();
    }

    this.events.push(event);
  }

  clearEvents() {
    this.events = [];
  }

  protected incrementVersion() {
    if (!this.versionIncremented) {
      this.version += 1;
      this.versionIncremented = true;
    }
  }
}
