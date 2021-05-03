import { Command } from "@travelhoop/infrastructure";

interface FinishBookingsCommandPayload {}

export class FinishBookingsCommand implements Command<FinishBookingsCommandPayload> {
  constructor(public payload: FinishBookingsCommandPayload) {}
}
