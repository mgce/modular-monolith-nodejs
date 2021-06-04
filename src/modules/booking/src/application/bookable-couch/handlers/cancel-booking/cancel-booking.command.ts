import { Guid } from "guid-typescript";
import { Command } from "@travelhoop/abstract-core";
import { AggregateId } from "@travelhoop/shared-kernel";

interface CancelBookingCommandPayload {
  bookableCouchId: AggregateId;
  couchBookingId: Guid;
  reason: string;
}

export class CancelBookingCommand implements Command<CancelBookingCommandPayload> {
  constructor(public payload: CancelBookingCommandPayload) {}
}
