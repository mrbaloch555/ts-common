import { Request, Response, NextFunction } from "express";
import { Logger } from "../config/logger";
export const LogRequest = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logger.info(`Requested URL: ${req.url}`);
  Logger.info(`Requested Body: ${JSON.stringify(req.body)}`);
  next();
};
