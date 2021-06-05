import { CommandHandler } from "@travelhoop/abstract-core";
import { DomainEventDispatcher } from "@travelhoop/shared-kernel";
import { BookableCouchRepository, CouchBookingRequestRepository } from "../../../../domain";
import { ArchiveBookableCouchCommand } from "./archive-bookable-couch.command";

interface ArchiveBookableCouchCommandHandlerDependencies {
  couchBookingRequestRepository: CouchBookingRequestRepository;
  bookableCouchRepository: BookableCouchRepository;
  domainEventDispatcher: DomainEventDispatcher;
}

export class ArchiveBookableCouchCommandHandler implements CommandHandler<ArchiveBookableCouchCommand> {
  constructor(private readonly deps: ArchiveBookableCouchCommandHandlerDependencies) {}

  async execute({ payload }: ArchiveBookableCouchCommand) {
    const bookableCouch = await this.deps.bookableCouchRepository.get(payload.bookableCouchId);

    bookableCouch.archive();

    await this.deps.bookableCouchRepository.save(bookableCouch);
    await this.deps.domainEventDispatcher.dispatch(bookableCouch.events);
  }
}
