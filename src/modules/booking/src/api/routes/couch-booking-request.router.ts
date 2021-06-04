import { Request, Response } from "@travelhoop/infrastructure";
import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import asyncHandler from "express-async-handler";
import { CommandDispatcher } from "@travelhoop/infrastructure";
import { RejectCouchBookingRequestCommand } from "../../application/couch-booking-request/handlers/reject-couch-booking-request/reject-couch-booking-request.command";

interface CouchBookingRequestApiDependencies {
  commandDispatcher: CommandDispatcher;
}

const api = ({ commandDispatcher }: CouchBookingRequestApiDependencies) => ({
  rejectRequest: asyncHandler(async (req: Request, res: Response) => {
    const command = new RejectCouchBookingRequestCommand({ ...req.body, userId: req.user?.id! });
    await validateOrReject(command);
    res.json(await commandDispatcher.execute(command));
  }),
});

export const couchBookingRequestApi = makeInvoker(api);
