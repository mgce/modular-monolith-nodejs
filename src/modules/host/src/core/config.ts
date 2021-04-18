export interface EnvVariables extends NodeJS.Process {
  HOST_MODULE_MESSAGE_BROKER_QUEUE: string;
}

export const userModuleConfigFactory = (env: EnvVariables) => ({
  queues: {
    messageBroker: env.HOST_MODULE_MESSAGE_BROKER_QUEUE,
  },
});

export type UserModuleConfig = ReturnType<typeof userModuleConfigFactory>;
