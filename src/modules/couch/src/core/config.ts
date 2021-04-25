export interface EnvVariables extends NodeJS.Process {
  JWT_SECRET_KEY: string;
  ASYNC_MESSAGE_BROKER_QUEUE: string;
}

export const userModuleConfigFactory = (env: EnvVariables) => ({
  jwt: {
    secretKey: env.JWT_SECRET_KEY,
  },
  queues: {
    messageBroker: env.ASYNC_MESSAGE_BROKER_QUEUE,
  },
});

export type UserModuleConfig = ReturnType<typeof userModuleConfigFactory>;
