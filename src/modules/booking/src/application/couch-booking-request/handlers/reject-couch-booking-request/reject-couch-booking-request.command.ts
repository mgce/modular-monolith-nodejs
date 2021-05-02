import { Command } from "@travelhoop/infrastructure";
import { AggregateId } from "@travelhoop/shared-kernel";

interface RejectCouchBookingRequestCommandPayload {
  couchBookingRequestId: AggregateId;
  rejectionReasong: string;
}

export class RejectCouchBookingRequestCommand implements Command<RejectCouchBookingRequestCommandPayload> {
  constructor(public payload: RejectCouchBookingRequestCommandPayload) {}
}
