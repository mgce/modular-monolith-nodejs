import { TravelhoopError } from "@travelhoop/infrastructure";
import StatusCodes from "http-status-codes";

export class BookingReviewNotFoundError extends TravelhoopError {
  constructor() {
    super("Booking review not found", StatusCodes.NOT_FOUND);
  }
}
