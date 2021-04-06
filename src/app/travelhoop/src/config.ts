interface EnvVariables extends NodeJS.Process {
  SERVER_PORT: string;
}

export const configFactory = (env: EnvVariables) => ({
  app: {
    port: env.SERVER_PORT,
  },
});

export type AppConfig = ReturnType<typeof configFactory>;
