import pick from "lodash/pick";

require("dotenv").config();

const globalEnvKeys = [
  "CLIENT_ID",
  "CLIENT_SECRET",
  "RESPONSE_TYPE",
];

const picked = pick(process.env, globalEnvKeys);

export const webpackDefinedServer = {
  ...picked,
}