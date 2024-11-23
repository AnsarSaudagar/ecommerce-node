"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "image", {
      type: Sequelize.STRING(255),
      after: "category_id"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "image");
  },
};
