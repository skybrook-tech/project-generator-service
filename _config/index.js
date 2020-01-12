require("dotenv").config();

const DOMAIN = process.env.DOMAIN;
let PORT = process.env.PORT;

const config = {
  DOMAIN,
  PORT
};

module.exports = config;
