import { before } from "mocha";
import { loadEnvs } from "@travelhoop/infrastructure";
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { dbConfigFactory } from "../config/db-config";
import { loadModules } from "../module.loader";

loadEnvs();

before(() => {
  const appModules = loadModules();

  const dbConfig = dbConfigFactory(
    process.env as any,
    appModules.map(appModule => appModule.name),
  );

  return MikroORM.init(dbConfig, false);
});
