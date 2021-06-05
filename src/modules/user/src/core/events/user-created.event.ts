import { Event } from "@travelhoop/abstract-core";

interface UserCreatedPayload {
  id: string;
}

export class UserCreated implements Event {
  name = this.constructor.name;

  constructor(public payload: UserCreatedPayload) {}
}
