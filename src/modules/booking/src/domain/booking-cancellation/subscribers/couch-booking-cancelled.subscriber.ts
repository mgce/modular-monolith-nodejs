import { AggregateId, DomainEventSubscriber, DomainEventSubscribersMeta } from "@travelhoop/shared-kernel";
import { CouchBookingCancelled } from "../../bookable-couch";
import { BookingCancellation } from "../entity/booking-cancellation";
import { BookingCancellationRepository } from "../repository";

interface CouchBookingCancelledSubscriberDependencies {
  bookingCancellationRepository: BookingCancellationRepository;
}

export class CouchBookingCancelledSubscriber implements DomainEventSubscriber {
  constructor(private readonly deps: CouchBookingCancelledSubscriberDependencies) {}

  public getSubscribedEvents(): DomainEventSubscribersMeta<this>[] {
    return [{ name: CouchBookingCancelled.name, method: "onCouchBookingCancelled" }];
  }

  async onCouchBookingCancelled({ payload }: CouchBookingCancelled) {
    return this.deps.bookingCancellationRepository.add(
      BookingCancellation.create({
        ...payload.couchBooking,
        reason: payload.reason,
        id: AggregateId.parse(payload.couchBooking.id.toString()),
      }),
    );
  }
}
