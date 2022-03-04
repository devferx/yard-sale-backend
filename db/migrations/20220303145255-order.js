'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('../models/order.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
      total: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.items.length <= 0) return 0;
          return this.items.reduce(
            (total, item) => total + item.price * item.OrderProduct.amount,
            0
          );
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
