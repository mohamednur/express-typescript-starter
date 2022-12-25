import { config } from "dotenv";
import path from "path";
config({
  path: path.resolve(
    __dirname,
    `../.env.${process.env.NODE_ENV || "development"}.local`
  )
});

const { NODE_ENV, PORT, LOG_DIR } = process.env;

export default {
  NODE_ENV,
  PORT,
  LOG_DIR
};
