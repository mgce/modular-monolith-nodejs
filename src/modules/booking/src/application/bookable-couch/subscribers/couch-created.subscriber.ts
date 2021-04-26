import { Guid } from "guid-typescript";
import { EventSubscriber, EventSubscribersMeta } from "@travelhoop/infrastructure-types";
import { CouchCreated } from "../events/couch-created.event";
import { BookableCouch, BookableCouchRepository } from "../../../domain";

interface CouchCreatedSubscriberDependencies {
  bookableCouchRepository: BookableCouchRepository;
}

export class CouchCreatedSubscriber implements EventSubscriber {
  constructor(private readonly deps: CouchCreatedSubscriberDependencies) {}

  public getSubscribedEvents(): EventSubscribersMeta<this>[] {
    return [{ name: CouchCreated.name, method: "onCouchCreated" }];
  }

  async onCouchCreated({ payload: { id, quantity } }: CouchCreated) {
    return this.deps.bookableCouchRepository.add(BookableCouch.create({ id: Guid.parse(id), quantity }));
  }
}
