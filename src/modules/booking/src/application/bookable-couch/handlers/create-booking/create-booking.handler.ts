import { CommandHandler } from "@travelhoop/infrastructure";
import {
  BookableCouchRepository,
  CouchBookingRequestDomainService,
  CouchBookingRequestRepository,
} from "../../../../domain";
import { CreateBookingCommand } from "./create-booking.command";

interface CreateBookingCommandHandlerDependencies {
  couchBookingRequestDomainService: CouchBookingRequestDomainService;
  couchBookingRequestRepository: CouchBookingRequestRepository;
  bookableCouchRepository: BookableCouchRepository;
}

export class CreateBookingCommandHandler implements CommandHandler<CreateBookingCommand> {
  constructor(private readonly deps: CreateBookingCommandHandlerDependencies) {}

  async execute({ payload }: CreateBookingCommand) {
    const couchBookingRequest = await this.deps.couchBookingRequestRepository.get(payload.couchBookingRequestId);
    const couchBookingRequestDto = couchBookingRequest.toDto();

    const bookableCouch = await this.deps.bookableCouchRepository.get(couchBookingRequestDto.id);

    bookableCouch.createBooking(couchBookingRequestDto);
  }
}
