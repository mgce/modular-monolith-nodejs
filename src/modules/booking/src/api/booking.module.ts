import { standardAppModuleFactory, AppModule } from "@travelhoop/infrastructure";
import { createContainer } from "../infrastructure/container";

export const bookingModule: AppModule = standardAppModuleFactory({
  basePath: "booking",
  name: "booking-module",
  createContainer,
});
