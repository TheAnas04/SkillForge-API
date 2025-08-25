import winston from "winston";
import { config } from "../config/env.js";

const isDev = config.NODE_ENV !== "production";

export const logger = winston.createLogger({
  level: isDev ? "debug" : "info",
  format: isDev
    ? winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({timestamp, level, message, ...meta}) => {
        return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
      })
    )
    : winston.format.json(),
    transports: [new winston.transports.Console()], 
});