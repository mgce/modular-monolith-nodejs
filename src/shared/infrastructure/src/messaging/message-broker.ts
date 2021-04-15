import { MessageDispatcher } from "@travelhoop/infrastructure-types";

interface MessageBrokerDependencies {
  messageDispatcher: MessageDispatcher;
}

export class MessageBroker {
  constructor(private readonly deps: MessageBrokerDependencies) {}

  async publish<TMessage extends object>(message: TMessage) {
    await this.deps.messageDispatcher.publish(JSON.stringify(message));
  }
}
