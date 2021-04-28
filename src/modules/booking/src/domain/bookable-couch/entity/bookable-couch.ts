import { Guid } from "guid-typescript";
import { AggregateRoot, AggregateId } from "@travelhoop/shared-kernel";
import { CouchBooking } from "./couch-booking";
import { Booking } from "./booking";
import { CouchBookingRequest } from "./booking-request";
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

  static create(props: CreateBookableCouchProps) {
    return new BookableCouch(props);
  }

  private constructor({ id, quantity, hostId }: CreateBookableCouchProps) {
    super();
    this.id = AggregateId.create(id);
    this.quantity = quantity;
    this.hostId = hostId;
  }

  addBooking(bookingRequest: CouchBookingRequest) {
    this.canBook(bookingRequest.dateFrom, bookingRequest.dateTo, bookingRequest.quantity);

    const booking = CouchBooking.create(bookingRequest as any);

    this.bookings.push(booking);
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
