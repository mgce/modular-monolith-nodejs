import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
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
});

export const couchApi = makeInvoker(api);
