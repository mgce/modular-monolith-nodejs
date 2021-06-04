import { DomainEventDispatcher } from "@travelhoop/shared-kernel";
import { CommandHandler } from "@travelhoop/abstract-core";
import { BookableCouchRepository, CouchBookingRequestRepository } from "../../../../domain";
import { CreateBookingCommand } from "./create-booking.command";

interface CreateBookingCommandHandlerDependencies {
  couchBookingRequestRepository: CouchBookingRequestRepository;
  bookableCouchRepository: BookableCouchRepository;
  domainEventDispatcher: DomainEventDispatcher;
}

export class CreateBookingCommandHandler implements CommandHandler<CreateBookingCommand> {
  constructor(private readonly deps: CreateBookingCommandHandlerDependencies) {}

  async execute({ payload }: CreateBookingCommand) {
    const couchBookingRequest = await this.deps.couchBookingRequestRepository.get(payload.couchBookingRequestId);

    const couchBookingRequestDto = couchBookingRequest.toDto();

    const bookableCouch = await this.deps.bookableCouchRepository.get(couchBookingRequestDto.bookableCouchId);

    bookableCouch.createBooking(couchBookingRequestDto);

    await this.deps.bookableCouchRepository.save(bookableCouch);

    await this.deps.domainEventDispatcher.dispatch(bookableCouch.events);
  }
}
