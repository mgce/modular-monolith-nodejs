import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class BookingUnavailableError extends TravelhoopError {
  constructor(startDate: Date, endDate: Date) {
    super(`Between ${startDate} and ${endDate}, you cannot make a booking.`, StatusCodes.CONFLICT);
  }
}
