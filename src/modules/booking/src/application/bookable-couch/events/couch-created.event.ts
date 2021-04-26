import { Guid } from "guid-typescript";
import { Event } from "@travelhoop/infrastructure-types";

interface CouchCreatedPayload {
  id: Guid;
  quantity: number;
}

export class CouchCreated implements Event {
  name = this.constructor.name;

  constructor(public payload: CouchCreatedPayload) {}
}
