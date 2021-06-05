import { Guid } from "guid-typescript";
import { EventSubscriber, EventSubscribersMeta } from "@travelhoop/abstract-core";
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

  async onCouchCreated({ payload: { id, hostId, quantity } }: CouchCreated) {
    const bookableCouch = BookableCouch.create({ id: Guid.parse(id), hostId: Guid.parse(hostId), quantity });
    if (await this.deps.bookableCouchRepository.find(bookableCouch.id)) {
      return;
    }
    return this.deps.bookableCouchRepository.add(bookableCouch);
  }
}
