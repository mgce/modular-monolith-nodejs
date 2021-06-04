import { Command } from "@travelhoop/abstract-core";
import { AggregateId } from "@travelhoop/shared-kernel";

interface CreateBookingCommandPayload {
  couchBookingRequestId: AggregateId;
}

export class CreateBookingCommand implements Command<CreateBookingCommandPayload> {
  constructor(public payload: CreateBookingCommandPayload) {}
}
