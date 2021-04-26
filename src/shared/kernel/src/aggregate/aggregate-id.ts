import { Guid } from "guid-typescript";

export class AggregateId {
  private value: string;

  static create(guid?: Guid) {
    const id = new AggregateId();
    id.value = guid?.toString() || Guid.create().toString();
    return id;
  }

  static parse(guid: string) {
    const id = new AggregateId();
    id.value = Guid.parse(guid).toString();
    return id;
  }

  toString() {
    return this.value;
  }
}
