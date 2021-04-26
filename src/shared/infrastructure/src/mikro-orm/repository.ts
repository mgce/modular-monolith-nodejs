import { Connection, EntityManager, EntityRepository, EntitySchema, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { AggregateRoot } from "@travelhoop/shared-kernel";

export interface MikroOrmRepositoryDependencies {
  dbConnection: MikroORM<IDatabaseDriver<Connection>>;
  entitySchema: EntitySchema<any, AggregateRoot>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class MikroOrmRepository<TEntity, TProps> {
  protected readonly repo: EntityRepository<TProps>;

  protected readonly em: EntityManager<IDatabaseDriver<Connection>>;

  constructor({ dbConnection, entitySchema: entity }: MikroOrmRepositoryDependencies) {
    this.em = dbConnection.em;
    this.repo = (dbConnection.em.getRepository<TProps>(entity) as unknown) as EntityRepository<TProps>;
  }
}
