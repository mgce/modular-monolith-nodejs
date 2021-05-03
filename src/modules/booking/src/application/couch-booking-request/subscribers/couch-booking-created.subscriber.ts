import { EventSubscriber, EventSubscribersMeta } from "@travelhoop/infrastructure-types";
import { CouchBookingCreated, CouchBookingRequestRepository } from "../../../domain";

interface CouchBookingCreatedSubscriberDependencies {
  couchBookingRequestRepository: CouchBookingRequestRepository;
}

export class CouchBookingCreatedSubscriber implements EventSubscriber {
  constructor(private readonly deps: CouchBookingCreatedSubscriberDependencies) {}

  public getSubscribedEvents(): EventSubscribersMeta<this>[] {
    return [{ name: CouchBookingCreated.name, method: "onCouchBookingCreated" }];
  }

  async onCouchBookingCreated({ payload: { couchBookingRequestId } }: CouchBookingCreated) {
    const couchBookingRequest = await this.deps.couchBookingRequestRepository.get(couchBookingRequestId);

    couchBookingRequest.accept();
  }
}