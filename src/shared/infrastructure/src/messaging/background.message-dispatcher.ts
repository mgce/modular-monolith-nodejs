import { RedisClient as Redis } from "redis";
import RSMQWorker from "rsmq-worker";
import { Logger } from "@travelhoop/infrastructure-types";
import { AppModule } from "..";

interface BacgroundMessageDispatcher {
  redis: Redis;
  queueName: string;
  logger: Logger;
  modules: AppModule[];
}

export const createBackgroundMessageDispatcher = ({
  redis,
  queueName,
  logger,
  modules,
}: BacgroundMessageDispatcher) => {
  const worker = new RSMQWorker(queueName, { redis });

  worker.on("message", (msg, next, id) => {
    // process your message
    logger.info(`Processing message  with id : ${id} and payload ${msg}`);

    const message = JSON.parse(msg);

    Promise.all(modules.map(appModule => appModule.dispatchEvent(message).catch(logger.error))).then(() => next());
  });

  // optional error listeners
  worker.on("error", (err, msg) => {
    logger.error("ERROR", { err, msg });
  });
  worker.on("exceeded", msg => {
    logger.error("EXCEEDED", msg.id);
  });
  worker.on("timeout", msg => {
    logger.error("TIMEOUT", { msg });
  });

  worker.start();
};
