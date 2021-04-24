import { Guid } from "guid-typescript";
import { Couch } from "../entities/couch";
import { CreateCouchDto } from "../dto/create-couch.dto";
import { CouchRepository } from "../repositories/couch.repository";
import { UpdateCouchDto } from "../dto/update-couch.dto";

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

  async update(dto: UpdateCouchDto) {
    const couch = await this.deps.couchRepository.get(Guid.parse(dto.couchId));

    couch.description = dto.description;
    couch.name = dto.name;
    couch.rooms = dto.rooms;
  }
}
