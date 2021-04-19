import { TravelhoopError } from "@travelhoop/infrastructure";
import StatusCodes from "http-status-codes";

export class UserNotFoundError extends TravelhoopError {
  constructor() {
    super("User not found", StatusCodes.NOT_FOUND);
  }
}
