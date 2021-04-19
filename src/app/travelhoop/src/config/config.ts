export interface EnvVariables extends NodeJS.Process {
  SERVER_PORT: string;
  POSTGRES_URL: string;
  REDIS_URL: string;
  ASYNC_MESSAGE_BROKER_QUEUE: string;
}

export const appConfigFactory = (env: EnvVariables) => ({
  app: {
    port: parseInt(env.SERVER_PORT, 10),
  },
  database: {
    url: env.POSTGRES_URL,
  },
  redis: {
    url: env.REDIS_URL,
  },
  queues: {
    messageBroker: env.ASYNC_MESSAGE_BROKER_QUEUE,
  },
});

export type AppConfig = ReturnType<typeof appConfigFactory>;
