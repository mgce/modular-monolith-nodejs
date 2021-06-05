import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class CannotArchiveCouchError extends TravelhoopError {
  constructor() {
    super("Cannot archive couch", StatusCodes.BAD_REQUEST);
  }
}
