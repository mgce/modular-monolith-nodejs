import { BookingCancellation } from "../entity/booking-cancellation";

export interface BookingCancellationRepository {
  add: (bookingCancellation: BookingCancellation) => Promise<void>;
}
