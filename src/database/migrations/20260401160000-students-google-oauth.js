"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("students", "google_id", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.changeColumn("students", "password", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("students", "ra", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students", "google_id");

    await queryInterface.changeColumn("students", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("students", "ra", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
