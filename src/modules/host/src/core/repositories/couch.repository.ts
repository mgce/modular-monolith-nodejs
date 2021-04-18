import { DbConnection } from "@travelhoop/infrastructure-types";
import { Couch } from "../entities/couch";

interface CouchRepositoryDependencies {
  dbConnection: DbConnection;
}
export class CouchRepository {
  constructor(private readonly deps: CouchRepositoryDependencies) {}

  async add(couch: Couch): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(couch);
  }
}
