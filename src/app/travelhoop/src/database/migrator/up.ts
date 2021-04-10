import { MikroORM } from "@mikro-orm/core";
import { loadEnvs } from "../../config";
import { dbConfigFactory } from "../../config/db-config";
import { loadModules } from "../../module.loader";

(async () => {
  loadEnvs();
  const modules = loadModules();
  const config = dbConfigFactory(
    process.env as any,
    modules.map(appModule => appModule.name),
  );

  const orm = await MikroORM.init(config);
  const migrator = orm.getMigrator();
  await migrator.up(); // runs migrations up to the latest
  await orm.close(true);
})();
