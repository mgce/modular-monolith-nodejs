export interface EnvVariables extends NodeJS.Process {
  SERVER_PORT: string;
  POSTGRES_URL: string;
}

export const appConfigFactory = (env: EnvVariables) => ({
  app: {
    port: parseInt(env.SERVER_PORT, 10),
  },
  database: {
    url: env.POSTGRES_URL,
  },
});

export type AppConfig = ReturnType<typeof appConfigFactory>;
