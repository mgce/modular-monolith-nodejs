import { AggregateId, DomainEvent } from "@travelhoop/shared-kernel";

interface CouchBookingCreatedPayload {
  couchBookingRequestId: AggregateId;
}

export class CouchBookingCreated implements DomainEvent<CouchBookingCreatedPayload> {
  name = this.constructor.name;

  constructor(public payload: CouchBookingCreatedPayload) {}
}
