// import { Guid } from "guid-typescript";
// import { Command } from "@travelhoop/infrastructure";
// import { AggregateId } from "@travelhoop/shared-kernel";
// import { object, date, SchemaOf, number } from "yup";

// interface RequestCouchBookingCommandPayload {
//   couchId: AggregateId;
//   guestId: Guid;
//   dateFrom: Date;
//   dateTo: Date;
//   quantity: number;
// }

// export class RequestCouchBookingCommand implements Command<RequestCouchBookingCommandPayload> {
//   constructor(public payload: RequestCouchBookingCommandPayload) {}
// }

// const aggregateIdValidator: SchemaOf<any> = object().test("is-aggregate-id", "It is not an aggregate id", value =>
//   AggregateId.isAggregateId((value as unknown) as AggregateId),
// );

// const guidValidator: SchemaOf<any> = object().test("is-aggregate-id", "It is not an aggregate id", value =>
//   Guid.isGuid((value as unknown) as Guid),
// );

// export const requestCouchBookingCommandValidator: SchemaOf<RequestCouchBookingCommand> = object({
//   payload: object({
//     couchId: aggregateIdValidator.required(),
//     guestId: guidValidator.required(),
//     dateFrom: date().required(),
//     dateTo: date().required(),
//     quantity: number().min(1).required(),
//   }).required(),
// });
