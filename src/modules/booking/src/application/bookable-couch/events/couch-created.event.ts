import { Event } from "@travelhoop/abstract-core";

interface CouchCreatedPayload {
  id: string;
  hostId: string;
  quantity: number;
}

export class CouchCreated implements Event {
  name = this.constructor.name;

  constructor(public payload: CouchCreatedPayload) {}
}
