import { EventSubscriber, EventSubscribersMeta } from "@travelhoop/infrastructure-types";
import { Guid } from "guid-typescript";
import { BookingFinished } from "../events/external/booking-finished.event";
import { BookingReviewRepository } from "../repositories/booking-review.repository";
import { BookingReview } from "./../entities/booking-review";

interface BookingFinishedSubscriberDependencies {
  bookingReviewRepository: BookingReviewRepository;
}

export class BookingFinishedSubscriber implements EventSubscriber {
  constructor(private readonly deps: BookingFinishedSubscriberDependencies) {}

  public getSubscribedEvents(): EventSubscribersMeta<this>[] {
    return [{ name: BookingFinished.name, method: "onBookingFinished" }];
  }

  async onBookingFinished({ payload: { hostId, guestId } }: BookingFinished) {
    const existingHostReview = await this.deps.bookingReviewRepository.findByReviewerIdAndRevieweeId(
      Guid.parse(hostId),
      Guid.parse(guestId),
    );

    if (existingHostReview) {
      return;
    }

    const hostReview = BookingReview.create({
      id: Guid.create(),
      reviewerId: Guid.parse(guestId),
      revieweeId: Guid.parse(hostId),
    });

    const guestReview = BookingReview.create({
      id: Guid.create(),
      reviewerId: Guid.parse(guestId),
      revieweeId: Guid.parse(hostId),
    });

    return this.deps.bookingReviewRepository.add(hostReview, guestReview);
  }
}
