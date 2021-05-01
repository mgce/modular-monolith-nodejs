import { AggregateId } from "@travelhoop/shared-kernel";
import { CouchBookingRequest } from "../entity/couch-booking-request";

export interface CouchBookingRequestRepository {
  get: (id: AggregateId) => Promise<CouchBookingRequest>;
  add: (bookableCouch: CouchBookingRequest) => Promise<void>;
}
