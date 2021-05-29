const dotenv = require("dotenv");

export const loadEnvs = () => {
  dotenv.config();
};

export interface EnvVariables extends NodeJS.Process {
  API_URL: string;
}

export const appConfigFactory = (env: EnvVariables) => ({
  apiUrl: env.API_URL,
});

export type AppConfig = ReturnType<typeof appConfigFactory>;
