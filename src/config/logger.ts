import winston, { info } from "winston";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

export const Logger = winston.createLogger({
  level: process.env.NODE_ENV === "dev" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === "dev"
      ? winston.format.colorize()
      : winston.format.uncolorize(),

    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),

  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});
