import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import { Request, Response } from "@travelhoop/infrastructure-types";
import asyncHandler from "express-async-handler";
import { UpdateCouchDto } from "../../core/dto/update-couch.dto";
import { CreateCouchDto } from "../../core/dto/create-couch.dto";
import { CouchService } from "../../core/services/couch.service";

interface CouchApiDependencies {
  couchService: CouchService;
}

const api = ({ couchService }: CouchApiDependencies) => ({
  create: asyncHandler(async (req: Request, res: Response) => {
    const dto = new CreateCouchDto(req.body);
    await validateOrReject(dto);
    res.json(await couchService.create(dto));
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const dto = new UpdateCouchDto({ id: req.params.id, hostId: req.user?.id.toString(), ...req.body });
    await validateOrReject(dto);
    res.json(await couchService.update(dto));
  }),
});

export const couchApi = makeInvoker(api);
