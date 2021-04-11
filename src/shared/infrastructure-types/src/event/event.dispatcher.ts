import { Event } from "./event";

export interface EventDispatcher {
  dispatch(event: Event): Promise<void>;
}
