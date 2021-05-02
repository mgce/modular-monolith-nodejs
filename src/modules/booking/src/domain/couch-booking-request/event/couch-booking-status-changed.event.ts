import { AggregateId, DomainEvent } from "@travelhoop/shared-kernel";
import { RequestStatus } from "../entity/request-status";

interface CouchBookingStatusChangedPayload {
  couchBookingRequestId: AggregateId;
  status: RequestStatus;
  decisionDate: Date;
  rejectionReason?: string;
}

export class CouchBookingStatusChanged implements DomainEvent<CouchBookingStatusChangedPayload> {
  constructor(public payload: CouchBookingStatusChangedPayload) {}
}
