import { Guid } from "guid-typescript";
import { Command } from "@travelhoop/abstract-core";
import { AggregateId } from "@travelhoop/shared-kernel";

interface RequestCouchBookingCommandPayload {
  bookableCouchId: AggregateId;
  guestId: Guid;
  dateFrom: Date;
  dateTo: Date;
  quantity: number;
}

export class RequestCouchBookingCommand implements Command<RequestCouchBookingCommandPayload> {
  constructor(public payload: RequestCouchBookingCommandPayload) {}
}
