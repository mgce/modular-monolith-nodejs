import { DomainEventDispatcher } from "@travelhoop/shared-kernel";
import { CommandHandler } from "@travelhoop/infrastructure";
import {
  BookableCouchBookingCancellationPolicy,
  BookableCouchRepository,
  CouchBookingRequestRepository,
} from "../../../../domain";
import { CancelBookingCommand } from "./cancel-booking.command";

interface CancelBookingCommandHandlerDependencies {
  couchBookingRequestRepository: CouchBookingRequestRepository;
  bookableCouchRepository: BookableCouchRepository;
  domainEventDispatcher: DomainEventDispatcher;
}

export class CancelBookingCommandHandler implements CommandHandler<CancelBookingCommand> {
  constructor(private readonly deps: CancelBookingCommandHandlerDependencies) {}

  async execute({ payload }: CancelBookingCommand) {
    const bookableCouch = await this.deps.bookableCouchRepository.get(payload.bookableCouchId);

    bookableCouch.cancelBooking(
      payload.couchBookingId,
      payload.reason,
      new BookableCouchBookingCancellationPolicy({ maxDaysBeforeCancellation: 3 }),
    );

    await this.deps.domainEventDispatcher.dispatch(bookableCouch.events);
  }
}
