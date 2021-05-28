import { MessageBroker } from "@travelhoop/infrastructure";
import { Guid } from "guid-typescript";
import { BookingReviewDto } from "../dto/booking-review.dto";
import { UpdateBookingReviewDto } from "../dto/update-booking-review.dto";
import { ReviewDetails } from "../entities/review-details";
import { BookingReviewRepository } from "../repositories/booking-review.repository";

interface BookingReviewServiceDependencies {
  bookingReviewRepository: BookingReviewRepository;
  messageBroker: MessageBroker;
}

export class BookingReviewService {
  constructor(private readonly deps: BookingReviewServiceDependencies) {}

  async update(dto: UpdateBookingReviewDto) {
    const bookingReview = await this.deps.bookingReviewRepository.getByIdAndReviewerId(
      Guid.parse(dto.id),
      Guid.parse(dto.reviewerId),
    );

    if (bookingReview.reviewDetails) {
      throw new Error("Cannot fulfill review twice.");
    }

    bookingReview.reviewDetails = ReviewDetails.create({
      id: Guid.create(),
      comment: dto.comment,
      rate: dto.rate,
    });

    await this.deps.bookingReviewRepository.update(bookingReview);
  }

  async getById(bookingReviewId: Guid) {
    const bookingReview = await this.deps.bookingReviewRepository.get(bookingReviewId);
    return BookingReviewDto.createFromBookingReview(bookingReview);
  }
}
