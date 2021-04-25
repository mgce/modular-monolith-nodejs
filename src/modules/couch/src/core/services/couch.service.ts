import { Guid } from "guid-typescript";
import { Couch } from "../entities/couch";
import { CreateCouchDto } from "../dto/create-couch.dto";
import { CouchRepository } from "../repositories/couch.repository";
import { UpdateCouchDto } from "../dto/update-couch.dto";
import { CouchDto } from "../dto/couch.dto";

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
    const couch = await this.deps.couchRepository.get(Guid.parse(dto.id));

    couch.description = dto.description;
    couch.name = dto.name;
    couch.rooms = dto.rooms;
  }

  async getByUserId(userId: Guid) {
    const couches = await this.deps.couchRepository.getByUserId(userId);
    return couches.map(couch => new CouchDto(couch));
  }

  async getById(couchId: Guid) {
    const couch = await this.deps.couchRepository.get(couchId);
    return new CouchDto(couch);
  }
}
