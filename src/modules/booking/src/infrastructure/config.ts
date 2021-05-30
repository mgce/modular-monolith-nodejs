export interface EnvVariables extends NodeJS.Process {
  JWT_SECRET_KEY: string;
  ASYNC_MESSAGE_BROKER_QUEUE: string;
  SCHEDULER_SECURITY_TOKEN: string;
}

export const bookingModuleConfigFactory = (env: EnvVariables) => ({
  jwt: {
    secretKey: env.JWT_SECRET_KEY,
  },
  securityTokens: {
    schedulerToken: env.SCHEDULER_SECURITY_TOKEN,
  },
  queues: {
    messageBroker: env.ASYNC_MESSAGE_BROKER_QUEUE,
  },
});

export type BookingModuleConfig = ReturnType<typeof bookingModuleConfigFactory>;
