import { TravelhoopError } from "@travelhoop/abstract-core";
import StatusCodes from "http-status-codes";

export class AllCouchesAreReservedError extends TravelhoopError {
  constructor() {
    super("All couches are reserved", StatusCodes.CONFLICT);
  }
}
