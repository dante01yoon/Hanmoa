const pick = require("lodash/pick");

require("dotenv").config();

const globalEnvKeys = [
  "CLIENT_ID",
  "CLIENT_SECRET",
  "RESPONSE_TYPE",
];

const picked = pick(process.env, globalEnvKeys);

module.exports = {
  ...picked,
}