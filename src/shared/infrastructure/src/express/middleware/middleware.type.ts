import { NextFunction, Request, Response } from "express";

export type MiddlewareType = (req: Request, res: Response, next: NextFunction) => Promise<any>;
