'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("review_likes", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "users", // Reference to the users table
          key: "id",
        },
        onDelete: "CASCADE", // Delete likes if the user is deleted
      },
      review_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "product_reviews", // Reference to the product_reviews table
          key: "id",
        },
        onDelete: "CASCADE", // Delete likes if the review is deleted
      },
      action: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "1 for like, 0 for dislike",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("review_likes");
  }
};
