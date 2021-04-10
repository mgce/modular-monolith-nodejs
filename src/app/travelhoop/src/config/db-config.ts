import { Options } from "@mikro-orm/core";
import { join } from "path";
import { loadEnvs } from "@travelhoop/infrastructure";
import { EnvVariables } from ".";

loadEnvs();

export const dbConfigFactory = (env: EnvVariables, modulesNames: string[]): Options => {
  return {
    type: "postgresql",
    clientUrl: env.POSTGRES_URL,
    entities: modulesNames.map(moduleName =>
      join(__dirname, `../../node_modules/@travelhoop/${moduleName}/build/core/entities/*.js`),
    ),
    forceUndefined: true,
    debug: false,
    migrations: {
      tableName: "mikro_orm_migrations", // name of database table with log of executed transactions
      path: join(__dirname, "../../build/migrations"), // path to the folder with migrations
      pattern: /^[\w-]+\d+\.js$/, // regex pattern for the migration files
      transactional: true, // wrap each migration in a transaction
      disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
      allOrNothing: true, // wrap all migrations in master transaction
      dropTables: true, // allow to disable table dropping
      safe: false, // allow to disable table and column dropping
      emit: "ts", // migration generation mode
      fileName: timestamp => `migration-${timestamp}`,
    },
  };
};

export type DbConfig = ReturnType<typeof dbConfigFactory>;
