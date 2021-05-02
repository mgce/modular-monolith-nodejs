import { AggregateId, AggregateRoot } from "@travelhoop/shared-kernel";
import { Guid } from "guid-typescript";
import { UnavailableBooking } from ".";
import {
  CouchBookingRequestProps,
  CreateCouchBookingRequest,
} from "../../couch-booking-request/entity/couch-booking-request";
import { CouchBookingCreated } from "../event/couch-booking-created.event";
import { Booking } from "./booking";
import { CouchBooking } from "./couch-booking";
import { BookingCancellationPolicy } from "../policy";
import { CouchBookingCancelled } from "../event/couch-booking-cancelled.event";

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

  createBooking(couchBookingRequest: CouchBookingRequestProps) {
    this.canBook(couchBookingRequest);

    const booking = CouchBooking.create({
      ...couchBookingRequest,
      id: Guid.parse(couchBookingRequest.id.toString()),
    });

    this.bookings.push(booking);
    this.addEvent(new CouchBookingCreated({ couchBookingRequestId: couchBookingRequest.id }));
  }

  cancelBooking(couchBookingId: Guid, reason: string, bookingCancellationPolicy: BookingCancellationPolicy) {
    const couchBooking = this.bookings.find(booking => booking.id.equals(couchBookingId));

    if (!couchBooking || !(couchBooking instanceof CouchBooking)) {
      throw new Error("Booking doesn't exists");
    }

    if (bookingCancellationPolicy.canCancel(couchBooking)) {
      this.bookings = this.bookings.filter(booking => booking.id !== couchBooking.id);
      this.addEvent(new CouchBookingCancelled({ couchBooking, reason }));
    } else {
      throw new Error("Cannot cancel booking");
    }
  }

  public canBook({ dateFrom, dateTo, quantity: requestedQuantity, guestId }: Omit<CreateCouchBookingRequest, "id">) {
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
      .some(booking => (booking as CouchBooking).quantity > this.quantity - requestedQuantity);

    if (allCouchReserved) {
      throw new Error("All couches are reserved");
    }
  }

  private getOverlappingBookings(dateFrom: Date, dateTo: Date) {
    return this.bookings.filter(booking => booking.dateFrom <= dateTo && dateFrom <= booking.dateTo);
  }
}
