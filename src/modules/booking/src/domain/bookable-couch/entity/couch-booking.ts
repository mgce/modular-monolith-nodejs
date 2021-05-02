import { Guid } from "guid-typescript";
import { Booking, BookingProps } from "./booking";

export interface CouchBookingProps extends BookingProps {
  guestId: Guid;
  quantity: number;
}

export class CouchBooking extends Booking {
  guestId: Guid;

  quantity: number;

  static create(props: CouchBookingProps) {
    return new CouchBooking(props);
  }

  private constructor(props: CouchBookingProps) {
    super();
    this.id = props.id;
    this.guestId = props.guestId;
    this.dateFrom = props.dateFrom;
    this.dateTo = props.dateTo;
    this.quantity = props.quantity;
  }
}
