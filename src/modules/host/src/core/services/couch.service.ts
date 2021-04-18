import { Guid } from "guid-typescript";
import { Couch } from "../entities/couch";
import { CreateCouchDto } from "../dto/create-couch.dto";
import { CouchRepository } from "../repositories/couch.repository";

interface CouchServiceDependencies {
  couchRepository: CouchRepository;
}

export class CouchService {
  constructor(private readonly deps: CouchServiceDependencies) {}

  async create(dto: CreateCouchDto) {
    const id = Guid.create();
    const couch = Couch.create({ id, ...dto });
    await this.deps.couchRepository.add(couch);
  }
}
