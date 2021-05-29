import fetch from "node-fetch";
import { appConfigFactory } from "./config/config";

const httpClientInitializer = () => {
  const config = appConfigFactory(process.env as any);

  return (urlPath: string) => {
    const requestPath = `${config.apiUrl}/${urlPath}`;
    return fetch(requestPath, {
      method: "POST",
    }).then(() => {
      // eslint-disable-next-line no-console
      console.log("[REQUEST]", new Date(), requestPath);
    });
  };
};

export const httpClient = httpClientInitializer();
