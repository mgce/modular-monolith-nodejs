import { Logger } from "@travelhoop/shared-infrastructure";
import { Server } from "http";
import { loadEnvs } from "./config";
import { configFactory } from "./config/config";
import { setupContainer } from "./container";

loadEnvs();

(async () => {
  const appConfig = configFactory(process.env as any);
  const container = await setupContainer({ appConfig });

  process.on("uncaughtException", err => {
    container.resolve<Logger>("logger").error(`Uncaught: ${err.toString()}`, err);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    if (err) {
      container.resolve<Logger>("logger").error(`Unhandled: ${err.toString()}`, err);
    }
    process.exit(1);
  });

  const server: Server = container.resolve("server");

  const port = container.resolve("port");
  server.listen(port);
  container.resolve<Logger>("logger").info(`listening on port: ${port}`);
})();
