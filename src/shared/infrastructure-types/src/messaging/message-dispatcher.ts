export interface MessageDispatcher {
  publish(message: string): Promise<void>;
}
