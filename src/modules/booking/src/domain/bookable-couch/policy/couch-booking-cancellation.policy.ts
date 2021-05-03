import { addDays } from "date-fns";
import { CouchBooking } from "../entity";

export interface BookingCancellationPolicy {
  canCancel: (couchBooking: CouchBooking) => boolean;
}

interface CouchBookingCancellationPolicyDependencies {
  maxDaysBeforeCancellation: number;
}

export class CouchBookingCancellationPolicy implements BookingCancellationPolicy {
  constructor(private readonly deps: CouchBookingCancellationPolicyDependencies) {}

  canCancel(couchBooking: CouchBooking) {
    if (couchBooking.dateFrom > addDays(new Date(), this.deps.maxDaysBeforeCancellation)) {
      return true;
    }
    return false;
  }
}
