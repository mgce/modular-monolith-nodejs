export interface EnvVariables extends NodeJS.Process {
  USER_MODULE_JWT_SECRET_KEY: string;
  USER_MODULE_JWT_EXPIRES_IN_MINUTES: string;
}

export const userModuleConfigFactory = (env: EnvVariables) => ({
  jwt: {
    secretKey: env.USER_MODULE_JWT_SECRET_KEY,
    expiry: Number(env.USER_MODULE_JWT_EXPIRES_IN_MINUTES),
  },
});

export type UserModuleConfig = ReturnType<typeof userModuleConfigFactory>;
