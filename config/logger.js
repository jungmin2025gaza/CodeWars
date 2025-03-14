const winston = require("winston");
const path = require("path");
const fs = require("fs");

const logDirectory = path.join(__dirname, "../logs");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, "combined.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
