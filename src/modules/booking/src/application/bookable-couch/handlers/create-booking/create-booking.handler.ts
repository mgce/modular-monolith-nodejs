import { DomainEventDispatcher } from "@travelhoop/shared-kernel";
import { CommandHandler } from "@travelhoop/infrastructure";
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

    const bookableCouch = await this.deps.bookableCouchRepository.get(couchBookingRequestDto.id);

    bookableCouch.createBooking(couchBookingRequestDto);

    await this.deps.domainEventDispatcher.dispatch(bookableCouch.events);
  }
}
