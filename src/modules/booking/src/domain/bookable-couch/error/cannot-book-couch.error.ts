import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class CannotBookCouchError extends TravelhoopError {
  constructor() {
    super("Cannot book couch", StatusCodes.BAD_REQUEST);
  }
}
