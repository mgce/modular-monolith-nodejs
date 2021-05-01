import { Guid } from "guid-typescript";
import { CommandHandler } from "@travelhoop/infrastructure";
import { BookableCouchRepository } from "../../../../domain";
import { RequestCouchBookingCommand } from "./request-couch-booking.command";

interface RequestCouchBookingCommandHandlerDependencies {
  bookableCouchRepository: BookableCouchRepository;
}

export class RequestCouchBookingCommandHandler implements CommandHandler<RequestCouchBookingCommand> {
  constructor(private readonly deps: RequestCouchBookingCommandHandlerDependencies) {}

  async execute({ payload }: RequestCouchBookingCommand) {
    const couch = await this.deps.bookableCouchRepository.get(payload.couchId);

    couch.requestBooking({ id: Guid.create(), ...payload });
  }
}
