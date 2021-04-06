import { Logger } from "@travelhoop/shared-infrastructure";
import { Server } from "http";
import { configFactory } from "./config";
import { setupContainer } from "./container";

(async () => {
  const container = await setupContainer({ appConfig: configFactory(process.env as any) });

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
