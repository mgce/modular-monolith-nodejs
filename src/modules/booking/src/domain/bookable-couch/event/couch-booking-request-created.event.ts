import { Guid } from "guid-typescript";
import { DomainEvent } from "@travelhoop/shared-kernel";

interface CouchBookingRequestCreatedPayload {
  id: Guid;
}

export class CouchBookingRequestCreated implements DomainEvent<CouchBookingRequestCreatedPayload> {
  constructor(public payload: CouchBookingRequestCreatedPayload) {}
}
