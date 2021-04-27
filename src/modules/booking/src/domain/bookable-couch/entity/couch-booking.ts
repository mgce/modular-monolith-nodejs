import { Guid } from "guid-typescript";
import { Booking, BookingProps } from "./booking";

export interface CouchBookingProps extends BookingProps {
  guestId: Guid;
}

export class CouchBooking extends Booking {
  private guestId: Guid;
}
