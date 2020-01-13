const axios = require("axios");

require("dotenv").config();

const domain = "mockend.lvh.me:1000";

const api = {
  projectService: axios.create({
    baseURL: `http://app.${domain}`,
    headers: { "internal-auth": process.env.INTERNAL_SERVICE_AUTH }
  })
};

module.exports = api;
