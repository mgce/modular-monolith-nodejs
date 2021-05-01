import { AggregateId, DomainEvent } from "@travelhoop/shared-kernel";

interface CouchBookingRequestCreatedPayload {
  couchBookingRequestId: AggregateId;
}

export class CouchBookingRequestCreated implements DomainEvent<CouchBookingRequestCreatedPayload> {
  constructor(public payload: CouchBookingRequestCreatedPayload) {}
}
