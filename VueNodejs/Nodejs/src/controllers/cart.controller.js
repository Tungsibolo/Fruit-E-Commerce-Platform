const db = require("../models");
const Cart = db.cart;
const Product = db.product;

exports.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  Cart.findOne({ where: { userId, productId } })
    .then((cartItem) => {
      if (cartItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        cartItem.quantity += quantity;
        return cartItem.save();
      } else {
        // Nếu chưa có, tạo mới một mục trong giỏ hàng
        return Cart.create({ userId, productId, quantity });
      }
    })
    .then((cartItem) => {
      res.json({ message: "Product added to cart successfully!", cartItem });
    })
    .catch((error) => {
      res.status(500).json({
        error: "Failed to add product to cart",
        details: error.message,
      });
    });
};

exports.getCart = (req, res) => {
  Cart.findAll({
    where: { userId: req.params.userId },
    include: [{ model: Product }],
  })
    .then((cartItems) => {
      res.json(cartItems);
    })
    .catch((error) => {
      res.status(500).json({
        error: "Failed to retrieve cart items",
        details: error.message,
      });
    });
};

exports.deleteProductInCart = (req, res) => {
  const { userId, productId } = req.params;

  Cart.destroy({ where: { userId, productId } })
    .then((deleted) => {
      if (deleted) {
        res.json({ message: "Product removed from cart successfully!" });
      } else {
        res.status(404).json({ message: "Product not found in cart" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "Failed to remove product from cart",
        details: error.message,
      });
    });
};
