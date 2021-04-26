import { Event } from "@travelhoop/infrastructure-types";

interface CouchCreatedPayload {
  id: string;
  quantity: number;
}

export class CouchCreated implements Event {
  name = this.constructor.name;

  constructor(public payload: CouchCreatedPayload) {}
}
