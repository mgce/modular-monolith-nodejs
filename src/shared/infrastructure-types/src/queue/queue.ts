export interface QueueClient {
  createQueue(queueName: string): Promise<void>;
  removeQueue(queueName: string): Promise<void>;
  getMessage(queueName: string): Promise<object>;
  sendMessage(queueName: string, message: string): Promise<void>;
}
