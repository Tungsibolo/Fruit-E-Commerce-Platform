const db = require("../models");
const Cart = db.cart;
const Order = db.order;
const OrderItem = db.orderItem;
const Product = db.product;

exports.placeOrder = async (req, res) => {
  try {
    const { userId, shippingAddress } = req.body;

    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.address
    ) {
      return res
        .status(400)
        .send({ message: "Shipping details are required." });
    }

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });

    if (cartItems.length === 0) {
      return res.status(400).send({ message: "Your cart is empty." });
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    const shippingFee = 5000;
    const totalPayment = totalAmount + shippingFee;

    // Create order
    const order = await Order.create({
      userId,
      totalAmount,
      shippingFee,
      totalPayment,
      status: "Pending",
      shippingName: shippingAddress.name,
      shippingPhone: shippingAddress.phone,
      shippingAddress: shippingAddress.address,
    });

    // Add order items
    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    // Clear the cart after placing an order
    await Cart.destroy({ where: { userId } });

    res.send({ message: "Order placed successfully.", order });
  } catch (error) {
    console.error("❌ Failed to place order:", error);
    res.status(500).send({
      message: "Failed to place order.",
      error: error.message,
    });
  }
};

exports.getAllOrders = (req, res) => {
  Order.findAll({
    include: [{ model: OrderItem, include: [Product] }],
  })
    .then((orders) => {
      if (orders.length > 0) {
        res.send(orders);
      } else {
        res.status(404).send({
          message: "No orders found.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving orders.",
        error: err.message,
      });
    });
};
