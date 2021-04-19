export interface EnvVariables extends NodeJS.Process {
  JWT_SECRET_KEY: string;
  USER_MODULE_JWT_EXPIRES_IN_MINUTES: string;
  ASYNC_MESSAGE_BROKER_QUEUE: string;
}

export const userModuleConfigFactory = (env: EnvVariables) => ({
  jwt: {
    secretKey: env.JWT_SECRET_KEY,
    expiry: Number(env.USER_MODULE_JWT_EXPIRES_IN_MINUTES),
  },
  queues: {
    messageBroker: env.ASYNC_MESSAGE_BROKER_QUEUE,
  },
});

export type UserModuleConfig = ReturnType<typeof userModuleConfigFactory>;
