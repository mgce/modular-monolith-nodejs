import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";

export type DbConnection = MikroORM<IDatabaseDriver<Connection>>;
