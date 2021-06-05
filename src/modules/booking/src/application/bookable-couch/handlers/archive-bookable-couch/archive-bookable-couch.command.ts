import { Command } from "@travelhoop/abstract-core";
import { AggregateId } from "@travelhoop/shared-kernel";

interface ArchiveBookableCouchCommandPayload {
  bookableCouchId: AggregateId;
}

export class ArchiveBookableCouchCommand implements Command<ArchiveBookableCouchCommandPayload> {
  constructor(public payload: ArchiveBookableCouchCommandPayload) {}
}
