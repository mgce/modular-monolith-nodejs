import { Guid } from "guid-typescript";
import { EventSubscriber, EventSubscribersMeta } from "@travelhoop/abstract-core";
import { Profile } from "../entities/profile";
import { UserCreated } from "../events/user-created.event";
import { ProfileRepository } from "../repositories/profile.repository";

interface UserCreatedSubscriberDependencies {
  profileRepository: ProfileRepository;
}

export class UserCreatedSubscriber implements EventSubscriber {
  constructor(private readonly deps: UserCreatedSubscriberDependencies) {}

  public getSubscribedEvents(): EventSubscribersMeta<this>[] {
    return [{ name: UserCreated.name, method: "onUserCreated" }];
  }

  async onUserCreated({ payload: { id } }: UserCreated) {
    const profileId = Guid.parse(id);
    if (await this.deps.profileRepository.find(profileId)) {
      return;
    }
    return this.deps.profileRepository.add(Profile.create({ id: profileId }));
  }
}
