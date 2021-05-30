const dotenv = require("dotenv");

export const loadEnvs = () => {
  dotenv.config();
};

export interface EnvVariables extends NodeJS.Process {
  API_URL: string;
  SCHEDULER_SECURITY_TOKEN: string;
}

export const appConfigFactory = (env: EnvVariables) => ({
  apiUrl: env.API_URL,
  schedulerToken: env.SCHEDULER_SECURITY_TOKEN,
});

export type AppConfig = ReturnType<typeof appConfigFactory>;
