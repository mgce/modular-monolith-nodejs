import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class BookingNotFoundError extends TravelhoopError {
  constructor() {
    super("Booking not found", StatusCodes.NOT_FOUND);
  }
}
