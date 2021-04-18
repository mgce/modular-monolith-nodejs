import { DbConnection } from "@travelhoop/infrastructure-types";
import { Host } from "../entities/host";

interface HostRepositoryDependencies {
  dbConnection: DbConnection;
}
export class HostRepository {
  constructor(private readonly deps: HostRepositoryDependencies) {}

  async add(host: Host): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(host);
  }
}
