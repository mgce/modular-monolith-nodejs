import { AggregateId, AggregateRoot } from "@travelhoop/shared-kernel";
import { Guid } from "guid-typescript";
import { UnavailableBooking } from ".";
import { CouchBookingRequestProps } from "../../couch-booking-request/entity/couch-booking-request";
import { Booking } from "./booking";
import { CouchBooking } from "./couch-booking";

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
    this.bookings = [];
  }

  public canBook({ dateFrom, dateTo, quantity: requestedQuantity, guestId }: Omit<CouchBookingRequestProps, "id">) {
    if (this.hostId.equals(guestId)) {
      throw new Error("You cannot book your couch");
    }

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
