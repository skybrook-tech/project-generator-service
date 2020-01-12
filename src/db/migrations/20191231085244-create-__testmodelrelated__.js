"use strict";
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.createTable("__testModelRelated__", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER
      },
      __testModel__id: {
        type: sequelize.INTEGER,
        references: { model: "__testModel__", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false
      },
      attr1: { type: sequelize.STRING },
      attr2: { type: sequelize.INTEGER },
      attr3: { type: sequelize.BOOLEAN },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE
      }
    });
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.dropTable("__testModelRelated__");
  }
};
