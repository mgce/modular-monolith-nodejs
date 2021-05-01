import { Guid } from "guid-typescript";
import { AggregateRoot, AggregateId } from "@travelhoop/shared-kernel";
import { CouchBooking } from "./couch-booking";
import { Booking } from "./booking";
import { CouchBookingRequest, CouchBookingRequestProps } from "./couch-booking-request";
import { UnavailableBooking } from ".";

export interface BookableCouchProps {
  id: AggregateId;
  quantity: number;
}

interface CreateBookableCouchProps {
  hostId: Guid;
  id: Guid;
  quantity: number;
}

export class BookableCouch extends AggregateRoot {
  private hostId: Guid;

  private quantity: number;

  private bookings: Booking[];

  private bookingRequests: CouchBookingRequest[];

  static create(props: CreateBookableCouchProps) {
    return new BookableCouch(props);
  }

  private constructor({ id, quantity, hostId }: CreateBookableCouchProps) {
    super();
    this.id = AggregateId.create(id);
    this.quantity = quantity;
    this.hostId = hostId;
  }

  requestBooking(props: CouchBookingRequestProps) {
    if (this.hostId.equals(props.guestId)) {
      throw new Error("You cannot book your couch");
    }

    this.canBook(props.dateFrom, props.dateTo, props.quantity);

    const bookingRequest = CouchBookingRequest.create(props as any);

    this.bookingRequests.push(bookingRequest);
  }

  private canBook(dateFrom: Date, dateTo: Date, requestedQuantity: number) {
    const overlappingBookings = this.getOverlappingBookings(dateFrom, dateTo);
    const areBookingUnavailable = overlappingBookings.some(booking => booking instanceof UnavailableBooking);

    if (areBookingUnavailable) {
      throw new Error("Between ths date you cannot make a booking");
    }

    const allCouchReserved = overlappingBookings
      .filter(booking => booking instanceof CouchBooking)
      .some(booking => (booking as CouchBooking).reservedQuantity > this.quantity - requestedQuantity);

    if (allCouchReserved) {
      throw new Error("All couches are reserved");
    }
  }

  private getOverlappingBookings(dateFrom: Date, dateTo: Date) {
    return this.bookings.filter(booking => booking.dateFrom <= dateTo && dateFrom <= booking.dateTo);
  }
}
