import * as winston from "winston";

export const obfuscateCircular = (obj: object, keysToHide: string[]) => {
  const seen = new WeakSet();
  const obfuscatory = "******";

  return JSON.stringify(obj, (k, v) => {
    if (keysToHide.includes(k)) {
      if (v !== null && typeof v === "string" && v.length >= 20) {
        return `${obfuscatory}${v.substring(v.length - 6)}`;
      }
      return obfuscatory;
    }
    if (v !== null && typeof v === "object") {
      if (seen.has(v)) {
        return undefined;
      }
      seen.add(v);
    }
    return v;
  });
};

const logFormat = (
  env = process.env,
  keysToHide: string[] = env.LOGGER_KEYS_TO_HIDE ? env.LOGGER_KEYS_TO_HIDE.split(",") : [],
) =>
  winston.format.printf(({ level, message, meta }) => {
    const stack = meta && meta.stack ? meta.stack : undefined;

    const logMessage = typeof message === "object" ? obfuscateCircular(message, keysToHide) : message;

    return JSON.stringify({
      "@timestamp": new Date().toISOString(),
      "@version": 1,
      application: env.APP_NAME,
      environment: env.NODE_ENV,
      host: env.HOST,
      message: logMessage,
      meta,
      stack,
      severity: level,
      type: "stdin",
    });
  });

export const createLogger = (env = process.env, keysToHide?: string[]) =>
  winston.createLogger({
    level: env.LOGGING_LEVEL || "debug",
    format: winston.format.combine(winston.format.splat(), logFormat(env, keysToHide)),
    transports: [new winston.transports.Console()],
  });
