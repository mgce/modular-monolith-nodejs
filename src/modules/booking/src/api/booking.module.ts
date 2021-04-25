import { standardAppModuleFactory } from "@travelhoop/infrastructure";
import { createContainer } from "../infrastructure/container";

export const bookingModule = standardAppModuleFactory({
  basePath: "booking",
  name: "booking-module",
  createContainer,
});
