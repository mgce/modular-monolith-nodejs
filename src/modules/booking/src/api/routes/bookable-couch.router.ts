import { Request, Response } from "@travelhoop/infrastructure";
import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import asyncHandler from "express-async-handler";
import { CommandDispatcher } from "@travelhoop/infrastructure";
import { FinishBookingsCommand } from "../../application/bookable-couch/handlers/finish-bookings/finish-bookings.command";
import { CreateBookingCommand } from "../../application/bookable-couch/handlers/create-booking/create-booking.command";
import { RequestCouchBookingCommand } from "../../application/couch-booking-request/handlers/request-couch-booking/request-couch-booking.command";

interface BookableCouchApiDependencies {
  commandDispatcher: CommandDispatcher;
}

const api = ({ commandDispatcher }: BookableCouchApiDependencies) => ({
  requestCouchBooking: asyncHandler(async (req: Request, res: Response) => {
    const command = new RequestCouchBookingCommand({
      ...req.body,
      guestId: req.user?.id!,
      dateFrom: new Date(req.body.dateFrom),
      dateTo: new Date(req.body.dateTo),
    });
    await validateOrReject(command);
    res.json(await commandDispatcher.execute(command));
  }),
  createBooking: asyncHandler(async (req: Request, res: Response) => {
    const command = new CreateBookingCommand(req.body);
    await validateOrReject(command);
    res.json(await commandDispatcher.execute(command));
  }),
  finishBookings: asyncHandler(async (_req: Request, res: Response) => {
    const command = new FinishBookingsCommand({});
    res.json(await commandDispatcher.execute(command));
  }),
});

export const bookableCouchApi = makeInvoker(api);
