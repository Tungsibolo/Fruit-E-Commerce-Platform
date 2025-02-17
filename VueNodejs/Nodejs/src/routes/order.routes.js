const { authJwt } = require("../middleware");
const controller = require("../controllers/order.Controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/order/checkout",
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    controller.placeOrder
  );

  app.get(
    "/api/order/getorders",
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    controller.getAllOrders
  );
};
