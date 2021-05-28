import { BookingReview } from "../entities/booking-review";

export class BookingReviewDto {
  id: string;

  reviewerId: string;

  revieweeId: string;

  comment?: string;

  rate?: number;

  fullfiledAt?: Date;

  constructor(props: BookingReviewDto) {
    Object.assign(this, props);
  }

  static createFromBookingReview(bookingReview: BookingReview) {
    return new BookingReviewDto({
      id: bookingReview.id.toString(),
      reviewerId: bookingReview.reviewerId.toString(),
      revieweeId: bookingReview.revieweeId.toString(),
      comment: bookingReview.reviewDetails?.comment,
      rate: bookingReview.reviewDetails?.rate,
      fullfiledAt: bookingReview.reviewDetails?.fullfiledAt,
    });
  }
}
