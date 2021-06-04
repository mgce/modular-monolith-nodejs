import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class BookingReviewNotFoundError extends TravelhoopError {
  constructor() {
    super("Booking review not found", StatusCodes.NOT_FOUND);
  }
}
