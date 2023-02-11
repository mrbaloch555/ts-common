import morgan from "morgan";
import { Request, Response } from "express";
import { Logger } from "./logger";

morgan.token(
  "message",
  (req: Request, res: Response) => res.locals.errorMessage || ""
);

const getIpFormat = () =>
  process.env.NODE_ENV === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const MorganSuccessHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message) => Logger.info(message.trim()) },
});

const MorganErrorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message) => Logger.error(message.trim()) },
});

export { MorganSuccessHandler, MorganErrorHandler };
