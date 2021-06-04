import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class UserExistsError extends TravelhoopError {
  constructor() {
    super("User with provided email exists", StatusCodes.BAD_REQUEST);
  }
}
