import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class CouchNotFoundError extends TravelhoopError {
  constructor() {
    super("Couch not found", StatusCodes.NOT_FOUND);
  }
}
