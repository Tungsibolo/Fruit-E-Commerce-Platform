module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("order_items", {
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });

  return OrderItem;
};
