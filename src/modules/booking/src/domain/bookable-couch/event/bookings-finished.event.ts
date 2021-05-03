import { DomainEvent } from "@travelhoop/shared-kernel";
import { Booking } from "..";

interface BookingsFinishedPayload {
  bookings: Booking[];
}

export class BookingsFinished implements DomainEvent<BookingsFinishedPayload> {
  constructor(public payload: BookingsFinishedPayload) {}
}
