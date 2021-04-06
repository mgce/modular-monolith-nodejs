interface EnvVariables extends NodeJS.Process {
  SERVER_PORT: string;
}

export const configFactory = (env: EnvVariables) => ({
  app: {
    port: parseInt(env.SERVER_PORT, 10),
  },
});

export type AppConfig = ReturnType<typeof configFactory>;
