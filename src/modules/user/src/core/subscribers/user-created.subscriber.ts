import { EventSubscriber, EventSubscribersMeta } from "@travelhoop/infrastructure-types";
import { UserCreated } from "../events/user-created.event";

interface UserCreatedSubscriberDependencies {}

export class UserCreatedSubscriber implements EventSubscriber {
  constructor(private readonly deps: UserCreatedSubscriberDependencies) {}

  public getSubscribedEvents(): EventSubscribersMeta<this>[] {
    return [{ name: UserCreated.name, method: "onUserCreated" }];
  }

  async onUserCreated(event: UserCreated) {
    console.log(event);
  }
}
