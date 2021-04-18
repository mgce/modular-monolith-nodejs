import { EventSubscriber, EventSubscribersMeta } from "@travelhoop/infrastructure-types";
import { Host } from "../entities/host";
import { UserCreated } from "../events/user-created.event";
import { HostRepository } from "../repositories/host.repository";

interface UserCreatedSubscriberDependencies {
  hostRepository: HostRepository;
}

export class UserCreatedSubscriber implements EventSubscriber {
  constructor(private readonly deps: UserCreatedSubscriberDependencies) {}

  public getSubscribedEvents(): EventSubscribersMeta<this>[] {
    return [{ name: UserCreated.name, method: "onUserCreated" }];
  }

  async onUserCreated({ payload: { id } }: UserCreated) {
    return this.deps.hostRepository.add(Host.create({ id }));
  }
}
