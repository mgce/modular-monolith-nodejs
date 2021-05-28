import { Request, Response } from "@travelhoop/infrastructure-types";
import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import asyncHandler from "express-async-handler";
import { Guid } from "guid-typescript";
import { UpdateBookingReviewDto } from "../../core/dto/update-booking-review.dto";
import { BookingReviewService } from "../../core/services/booking-review.service";

interface CouchApiDependencies {
  bookingReviewService: BookingReviewService;
}

const api = ({ bookingReviewService }: CouchApiDependencies) => ({
  update: asyncHandler(async (req: Request, res: Response) => {
    const dto = new UpdateBookingReviewDto({ id: req.params.id, reviewerId: req.user?.id!, ...req.body });
    await validateOrReject(dto);
    res.json(await bookingReviewService.update(dto));
  }),
  getById: asyncHandler(async (req: Request, res: Response) => {
    res.json(await bookingReviewService.getById(Guid.parse(req.params.bookingReviewId)));
  }),
});

export const bookingReviewApi = makeInvoker(api);
