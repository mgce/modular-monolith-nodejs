import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class InvalidEmailOrPasswordError extends TravelhoopError {
  constructor() {
    super("Invalid email or password", StatusCodes.BAD_REQUEST);
  }
}
