import { TravelhoopError } from "@travelhoop/infrastructure";
import StatusCodes from "http-status-codes";

export class CouchNotFoundError extends TravelhoopError {
  constructor() {
    super("Couch not found", StatusCodes.NOT_FOUND);
  }
}
