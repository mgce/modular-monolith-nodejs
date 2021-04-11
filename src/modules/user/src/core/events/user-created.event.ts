import { Event } from "@travelhoop/infrastructure-types";
import { Guid } from "guid-typescript";

interface UserCreatedPayload {
  id: Guid;
}

export class UserCreated implements Event {
  constructor(public payload: UserCreatedPayload) {}
}
