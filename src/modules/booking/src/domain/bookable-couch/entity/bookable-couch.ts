import { AggregateId, AggregateRoot } from "@travelhoop/shared-kernel";
import { Guid } from "guid-typescript";
import { Collection } from "@mikro-orm/core";
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
import { BookingsFinished } from "../event/bookings-finished.event";
import {
  AllCouchesAreReservedError,
  BookingNotFoundError,
  CannotBookCouchError,
  CannotCancelBookingError,
  BookingUnavailableError,
} from "../error";

export interface BookableCouchProps {
  id: AggregateId;
  hostId: AggregateId;
  quantity: number;
  bookings: Booking[];
}

interface CreateBookableCouchProps {
  hostId: Guid;
  id: Guid;
  quantity: number;
}

export class BookableCouch extends AggregateRoot {
  private hostId: Guid;

  private quantity: number;

  private bookings = new Collection<Booking>(this);

  static create(props: CreateBookableCouchProps) {
    return new BookableCouch(props);
  }

  private constructor({ id, quantity, hostId }: CreateBookableCouchProps) {
    super();
    this.id = AggregateId.create(id);
    this.quantity = quantity;
    this.hostId = hostId;
  }

  createBooking(couchBookingRequest: CouchBookingRequestProps) {
    this.canBook(couchBookingRequest);

    const booking = CouchBooking.create({
      ...couchBookingRequest,
      id: Guid.parse(couchBookingRequest.id.toString()),
    });

    this.bookings.add(booking);
    this.addEvent(new CouchBookingCreated({ couchBookingRequestId: couchBookingRequest.id }));
  }

  cancelBooking(couchBookingId: Guid, reason: string, bookingCancellationPolicy: BookingCancellationPolicy) {
    const couchBooking = this.bookings.getItems().find(booking => booking.id.equals(couchBookingId));

    if (!couchBooking || !(couchBooking instanceof CouchBooking)) {
      throw new BookingNotFoundError();
    }

    if (bookingCancellationPolicy.canCancel(couchBooking)) {
      this.bookings.remove(couchBooking);
      this.addEvent(new CouchBookingCancelled({ couchBooking, reason }));
    } else {
      throw new CannotCancelBookingError();
    }
  }

  finishBookings() {
    const currentDate = new Date();
    const bookingsToFinish = this.bookings.getItems().filter(booking => booking.dateTo > currentDate);
    this.bookings.remove(...bookingsToFinish);
    this.addEvent(new BookingsFinished({ bookings: bookingsToFinish }));
  }

  public canBook({ dateFrom, dateTo, quantity: requestedQuantity, guestId }: Omit<CreateCouchBookingRequest, "id">) {
    if (this.hostId.equals(guestId)) {
      throw new CannotBookCouchError();
    }

    const overlappingBookings = this.getOverlappingBookings(dateFrom, dateTo);
    const areBookingUnavailable = overlappingBookings.some(booking => booking instanceof UnavailableBooking);

    if (areBookingUnavailable) {
      throw new BookingUnavailableError(dateFrom, dateTo);
    }

    const allCouchReserved = overlappingBookings
      .filter(booking => booking instanceof CouchBooking)
      .some(booking => (booking as CouchBooking).quantity > this.quantity - requestedQuantity);

    if (allCouchReserved) {
      throw new AllCouchesAreReservedError();
    }
  }

  private getOverlappingBookings(dateFrom: Date, dateTo: Date) {
    return this.bookings.getItems().filter(booking => booking.dateFrom <= dateTo && dateFrom <= booking.dateTo);
  }
}
