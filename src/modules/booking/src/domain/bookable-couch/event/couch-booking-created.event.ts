import { AggregateId, DomainEvent } from "@travelhoop/shared-kernel";

interface CouchBookingCreatedPayload {
  couchBookingRequestId: AggregateId;
}

export class CouchBookingCreated implements DomainEvent<CouchBookingCreatedPayload> {
  constructor(public payload: CouchBookingCreatedPayload) {}
}
