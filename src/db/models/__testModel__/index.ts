"use strict";
/* tslint:disable:variable-name */
import { DataTypes, Model, Sequelize } from "sequelize";
import { __testModel__ModelStatic } from "./types";

module.exports = (sequelize: Sequelize) => {
  const __testModel__ = sequelize.define(
    "__testModel__",
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
  ) as __testModel__ModelStatic & { associate: (models: Model) => void };

  __testModel__.associate = (models: any) => {
    __testModel__.hasMany(models.__testModelRelated__, {
      foreignKey: { allowNull: false, name: "__testModel__id" },
      onDelete: "CASCADE"
    });
  };

  return __testModel__;
};
