module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("carts", {
    userId: { type: Sequelize.INTEGER, allowNull: false },
    productId: { type: Sequelize.INTEGER, allowNull: false },
    quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  });

  return Cart;
};
