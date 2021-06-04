import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class UserNotFoundError extends TravelhoopError {
  constructor() {
    super("User not found", StatusCodes.NOT_FOUND);
  }
}
