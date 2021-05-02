import { CommandHandler } from "@travelhoop/infrastructure";
import { CouchBookingRequestDomainService } from "../../../../domain";
import { RequestCouchBookingCommand } from "./request-couch-booking.command";

interface RequestCouchBookingCommandHandlerDependencies {
  couchBookingRequestDomainService: CouchBookingRequestDomainService;
}

export class RequestCouchBookingCommandHandler implements CommandHandler<RequestCouchBookingCommand> {
  constructor(private readonly deps: RequestCouchBookingCommandHandlerDependencies) {}

  async execute({ payload }: RequestCouchBookingCommand) {
    return this.deps.couchBookingRequestDomainService.createRequest(payload);
  }
}
