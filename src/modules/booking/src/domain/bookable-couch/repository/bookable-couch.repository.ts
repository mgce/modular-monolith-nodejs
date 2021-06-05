import { AggregateId } from "@travelhoop/shared-kernel";
import { BookableCouch } from "../entity/bookable-couch";

export interface BookableCouchRepository {
  get: (id: AggregateId) => Promise<BookableCouch>;
  find: (id: AggregateId) => Promise<BookableCouch | null>;
  findWithFinishedBookings: () => Promise<BookableCouch[]>;
  add: (bookableCouch: BookableCouch) => Promise<void>;
  save: (bookableCouch: BookableCouch) => Promise<void>;
}
