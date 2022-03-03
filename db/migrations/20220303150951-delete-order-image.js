'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('orders', 'image');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'image', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
