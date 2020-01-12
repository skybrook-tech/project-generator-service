"use strict";
/* tslint:disable:variable-name */
import { DataTypes, Model, Sequelize } from "sequelize";
import { __testModelRelated__ModelStatic } from "./types";

module.exports = (sequelize: Sequelize) => {
  const __testModelRelated__ = sequelize.define(
    "__testModelRelated__",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      attr1: { type: DataTypes.STRING },
      attr2: { type: DataTypes.INTEGER },
      attr3: { type: DataTypes.BOOLEAN },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    { freezeTableName: true }
  ) as __testModelRelated__ModelStatic & { associate: (models: Model) => void };

  __testModelRelated__.associate = (models: any) => {
    __testModelRelated__.belongsTo(models.__testModel__, {
      targetKey: "id",
      foreignKey: { allowNull: false, name: "__testModel__id" },
      onDelete: "CASCADE"
    });
  };

  return __testModelRelated__;
};
