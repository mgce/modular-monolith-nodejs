import { QueueClient } from "@travelhoop/infrastructure-types";
import { RedisClient as Redis } from "redis";
import RedisSMQ, { QueueMessage } from "rsmq";

interface RedisClientDependencies {
  redis: Redis;
}

export class RedisClient implements QueueClient {
  private readonly client: Redis;

  private readonly queue: RedisSMQ;

  constructor({ redis }: RedisClientDependencies) {
    this.client = redis;
    this.queue = new RedisSMQ({ client: this.client });
  }

  async createQueue(queueName: string): Promise<void> {
    await this.queue.createQueueAsync({ qname: queueName });
  }

  async removeQueue(queueName: string): Promise<void> {
    await this.queue.deleteQueueAsync({ qname: queueName });
  }

  async getMessage(queueName: string): Promise<object> {
    const message = await this.queue.popMessageAsync({ qname: queueName });
    return JSON.parse((message as QueueMessage).message);
  }

  async sendMessage(queueName: string, message: string): Promise<void> {
    await this.queue.sendMessageAsync({ qname: queueName, message });
  }
}
