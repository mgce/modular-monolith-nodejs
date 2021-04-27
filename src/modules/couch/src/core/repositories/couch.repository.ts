import { Guid } from "guid-typescript";
import { DbConnection } from "@travelhoop/infrastructure-types";
import { Couch } from "../entities/couch";
import { CouchNotFoundError } from "../error/couch-not-found.error";

interface CouchRepositoryDependencies {
  dbConnection: DbConnection;
}
export class CouchRepository {
  constructor(private readonly deps: CouchRepositoryDependencies) {}

  async add(couch: Couch): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(couch);
  }

  async update(couch: Couch): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(couch);
  }

  async get(id: Guid) {
    const couch = await this.deps.dbConnection.em.getRepository(Couch).findOne({ id });

    if (!couch) {
      throw new CouchNotFoundError();
    }

    return couch;
  }

  async getByUserId(userId: Guid) {
    return this.deps.dbConnection.em.getRepository(Couch).find({ userId });
  }
}