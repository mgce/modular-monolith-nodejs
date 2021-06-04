import { Guid } from "guid-typescript";
import { DbConnection } from "@travelhoop/infrastructure";
import { BookingReview } from "../entities/booking-review";
import { BookingReviewNotFoundError } from "../error/booking-review-not-found.error";

interface BookingReviewRepositoryDependencies {
  dbConnection: DbConnection;
}
export class BookingReviewRepository {
  constructor(private readonly deps: BookingReviewRepositoryDependencies) {}

  async add(...bookingReview: BookingReview[]): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(bookingReview);
  }

  async update(bookingReview: BookingReview): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(bookingReview);
  }

  async get(bookingReviewId: Guid) {
    const bookingReview = await this.deps.dbConnection.em.getRepository(BookingReview).findOne({ id: bookingReviewId });

    if (!bookingReview) {
      throw new BookingReviewNotFoundError();
    }

    return bookingReview;
  }

  async findByReviewerIdAndRevieweeId(reviewerId: Guid, revieweeId: Guid) {
    return this.deps.dbConnection.em.getRepository(BookingReview).findOneOrFail({ reviewerId, revieweeId });
  }

  async getByIdAndReviewerId(bookingReviewId: Guid, reviewerId: Guid) {
    const bookingReview = await this.deps.dbConnection.em
      .getRepository(BookingReview)
      .findOneOrFail({ id: bookingReviewId, reviewerId });

    if (!bookingReview) {
      throw new BookingReviewNotFoundError();
    }

    return bookingReview;
  }
}
