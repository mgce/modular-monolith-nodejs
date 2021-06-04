import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class CannotCancelBookingError extends TravelhoopError {
  constructor() {
    super("Cannot cancel booking", StatusCodes.BAD_REQUEST);
  }
}
