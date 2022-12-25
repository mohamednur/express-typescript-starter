import { existsSync, mkdirSync } from "fs";
import path from "path";
import config from "config";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const NODE_ENV = config.get("NODE_ENV");
const LOGDIR = config.get<string>("LOG_DIR");

//logs dir
const logDir: string = path.join(__dirname, LOGDIR);
// path.join(__dirname, "../test");

// mkdirSync(path.join(__dirname, "../logs"));
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

//define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}:${message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    logFormat
  ),
  transports: [
    //debug log settings
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/debug",
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true
    }),
    //error log settings
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true
    })
  ]
});

if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize()
      )
    })
  );
}

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  }
};
export { stream, logger };
