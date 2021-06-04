import { Command } from "@travelhoop/abstract-core";

interface FinishBookingsCommandPayload {}

export class FinishBookingsCommand implements Command<FinishBookingsCommandPayload> {
  constructor(public payload: FinishBookingsCommandPayload) {}
}
