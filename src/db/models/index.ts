"use strict";
import fs from "fs";
import lodash from "lodash";
import { Sequelize } from "sequelize";
import CONFIG from "../../../_config/db";
import { Db } from "./db.types";

const env = process.env.NODE_ENV || "development";

let db = {} as Db;

const config = lodash.get(CONFIG, env);

const sequelize = new Sequelize(process.env[config.use_env_variable], config);

fs.readdirSync(__dirname).forEach((file: string) => {
  if (file !== "index.ts" && file !== "db.types.ts") {
    const model = require(`./${file}`)(sequelize);

    db = { ...db, [model.name]: model };
  }
});

const getModelByKey = (key: string) => lodash.get(db, key, {});

Object.keys(db).forEach(modelName => {
  if (getModelByKey(modelName).associate) {
    getModelByKey(modelName).associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
