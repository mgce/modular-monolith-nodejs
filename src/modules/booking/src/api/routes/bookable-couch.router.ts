import { Request, Response } from "@travelhoop/infrastructure-types";
import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import asyncHandler from "express-async-handler";
import { CommandDispatcher } from "../../../../../shared/infrastructure/src/command/command-bus";
import { RequestCouchBookingCommand } from "../../application/couch-booking-request/handlers/request-couch-booking/request-couch-booking.command";

interface BookableCouchApiDependencies {
  commandDispatcher: CommandDispatcher;
}

const api = ({ commandDispatcher }: BookableCouchApiDependencies) => ({
  requestCouchBooking: asyncHandler(async (req: Request, res: Response) => {
    const command = new RequestCouchBookingCommand({ ...req.body, userId: req.user?.id! });
    await validateOrReject(command);
    res.json(await commandDispatcher.execute(command));
  }),
});

export const bookableCouchApi = makeInvoker(api);
