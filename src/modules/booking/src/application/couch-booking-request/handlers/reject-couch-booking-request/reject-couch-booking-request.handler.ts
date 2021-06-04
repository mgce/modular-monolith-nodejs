import { CommandHandler } from "@travelhoop/abstract-core";
import { CouchBookingRequestRepository } from "../../../../domain";
import { RejectCouchBookingRequestCommand } from "./reject-couch-booking-request.command";

interface RejectCouchBookingRequestCommandHandlerDependencies {
  couchBookingRequestRepository: CouchBookingRequestRepository;
}

export class RejectCouchBookingRequestCommandHandler implements CommandHandler<RejectCouchBookingRequestCommand> {
  constructor(private readonly deps: RejectCouchBookingRequestCommandHandlerDependencies) {}

  async execute({ payload }: RejectCouchBookingRequestCommand) {
    const couchBookingRequest = await this.deps.couchBookingRequestRepository.get(payload.couchBookingRequestId);
    couchBookingRequest.reject(payload.rejectionReasong);
  }
}
