import { Event } from "./event";

export interface EventDispatcher {
  dispatch(events: Event[]): Promise<void>;
  dispatch(event: Event): Promise<void>;
}
