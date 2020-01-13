import { DefineModelArgs, Column } from "../types";
import { DataTypes } from "sequelize";

const convertColumnsToSequelizeColumns = (columns: Column[]) => {
  const sequelizeColumns = {};

  columns.forEach(({ type, name, options }) => {
    // @ts-ignore
    sequelizeColumns[name] = { ...options, type: DataTypes[type] };
  });

  return sequelizeColumns;
};

// TODO: setup model associations
const defineModel = ({ db, model, project }: DefineModelArgs) => {
  const schema = project.uuid;
  const sqlColumns = convertColumnsToSequelizeColumns(model.columns);

  const Model = db.define(model.name, sqlColumns, { schema, freezeTableName: true });

  // @ts-ignore
  db[model.name] = Model;

  return Model;
};

export default defineModel;
