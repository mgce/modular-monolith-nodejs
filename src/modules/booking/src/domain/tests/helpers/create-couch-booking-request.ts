import { addDays } from "date-fns";
import { Guid } from "guid-typescript";
import { AggregateId } from "../../../../../../shared/kernel/build";
import { CouchBookingRequest } from "../../couch-booking-request";

interface CreateCouchBookingRequestOptions {
  dateFrom: Date;
  dateTo: Date;
}

export const createCouchBookingRequest = (options?: CreateCouchBookingRequestOptions) => {
  const bookingRequest = CouchBookingRequest.create({
    id: AggregateId.create(),
    quantity: 2,
    dateFrom: options?.dateFrom || addDays(new Date(), 1),
    dateTo: options?.dateFrom || addDays(new Date(), 3),
    bookableCouchId: AggregateId.create(),
    guestId: Guid.create(),
  });

  bookingRequest.clearEvents();

  return bookingRequest;
};
