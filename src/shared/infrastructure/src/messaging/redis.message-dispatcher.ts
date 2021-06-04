import { QueueClient, MessageDispatcher } from "@travelhoop/abstract-core";

interface RedisMessageBrokerDependencies {
  queueClient: QueueClient;
  messageBrokerQueueName: string;
}

export class RedisMessageDispatcher implements MessageDispatcher {
  constructor(private readonly deps: RedisMessageBrokerDependencies) {}

  async publish(message: string): Promise<void> {
    await this.deps.queueClient.sendMessage(this.deps.messageBrokerQueueName, message);
  }
}
