import { AggregateId, DomainEvent } from "@travelhoop/shared-kernel";

interface BookableCouchArchiveddPayload {
  bookableCouchId: AggregateId;
}

export class BookableCouchArchived implements DomainEvent<BookableCouchArchiveddPayload> {
  constructor(public payload: BookableCouchArchiveddPayload) {}
}
