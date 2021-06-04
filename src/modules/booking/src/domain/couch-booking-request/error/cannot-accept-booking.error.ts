import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";
import { RequestStatus } from "..";

export class CannotAcceptBookingError extends TravelhoopError {
  constructor(status: RequestStatus) {
    super(`Cannot accept this booking request because current state is ${status}`, StatusCodes.BAD_REQUEST);
  }
}
