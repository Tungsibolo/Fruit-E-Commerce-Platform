module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "Pending",
    },
    shippingAddress: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    shippingAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shippingAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Order;
};
