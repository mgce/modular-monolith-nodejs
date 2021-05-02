import { DomainEvent } from "@travelhoop/shared-kernel";
import { CouchBooking } from "..";

interface CouchBookingCancelledPayload {
  couchBooking: CouchBooking;
  reason: string;
}

export class CouchBookingCancelled implements DomainEvent<CouchBookingCancelledPayload> {
  constructor(public payload: CouchBookingCancelledPayload) {}
}
