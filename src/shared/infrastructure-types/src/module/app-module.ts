import { Application } from "express";
import { RedisClient as Redis } from "redis";
import { DbConnection } from "../database/db-connection";
import { Event } from "../event";

export interface UseDependencies {
  dbConnection: DbConnection;
  redis: Redis;
}
export interface AppModule {
  basePath: string;
  name: string;
  path: string;
  use: (app: Application, deps: UseDependencies) => void;
  dispatchEvent(event: Event): Promise<void>;
}
