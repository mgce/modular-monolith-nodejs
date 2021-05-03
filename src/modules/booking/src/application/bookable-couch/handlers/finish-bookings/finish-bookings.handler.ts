import { CommandHandler } from "@travelhoop/infrastructure";
import { DomainEventDispatcher } from "@travelhoop/shared-kernel";
import { BookableCouchRepository, CouchBookingRequestRepository } from "../../../../domain";
import { FinishBookingsCommand } from "./finish-bookings.command";

interface FinishBookingsCommandHandlerDependencies {
  couchBookingRequestRepository: CouchBookingRequestRepository;
  bookableCouchRepository: BookableCouchRepository;
  domainEventDispatcher: DomainEventDispatcher;
}

export class FinishBookingsCommandHandler implements CommandHandler<FinishBookingsCommand> {
  constructor(private readonly deps: FinishBookingsCommandHandlerDependencies) {}

  async execute(_command: FinishBookingsCommand) {
    const bookableCouches = await this.deps.bookableCouchRepository.findWithFinishedBookings();

    bookableCouches.forEach(bookableCouch => bookableCouch.finishBookings());

    await Promise.all(
      bookableCouches.map(bookableCouch => this.deps.domainEventDispatcher.dispatch(bookableCouch.events)),
    );
  }
}
