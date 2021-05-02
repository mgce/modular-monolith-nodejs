import { addDays } from "date-fns";
import { CouchBooking } from "../entity";

export interface BookingCancellationPolicy {
  canCancel: (couchBooking: CouchBooking) => boolean;
}

interface BookableCouchBookingCancellationPolicyDependencies {
  maxDaysBeforeCancellation: number;
}

export class BookableCouchBookingCancellationPolicy implements BookingCancellationPolicy {
  constructor(private readonly deps: BookableCouchBookingCancellationPolicyDependencies) {}

  canCancel(couchBooking: CouchBooking) {
    if (couchBooking.dateFrom > addDays(new Date(), this.deps.maxDaysBeforeCancellation)) {
      return true;
    }
    return false;
  }
}
