import { MikroORM } from "@mikro-orm/core";
import { loadEnvs } from "@travelhoop/infrastructure";
import { dbConfigFactory } from "../../config/db-config";
import { loadModules } from "../../module.loader";

loadEnvs();

(async () => {
  const modules = loadModules();
  const config = dbConfigFactory(
    process.env as any,
    modules.map(appModule => appModule.name),
  );
  const orm = await MikroORM.init(config);
  const migrator = orm.getMigrator();
  await migrator.createMigration("./src/migrations", false, true);
  await orm.close(true);
})();
