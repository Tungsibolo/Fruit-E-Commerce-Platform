const { authJwt } = require("../middleware");
const controller = require("../controllers/cart.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/cart/add",
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    controller.addToCart
  );

  app.get(
    "/api/cart/:userId",
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    controller.getCart
  );

  app.delete(
    "/api/cart/:userId/:productId",
    [authJwt.verifyToken, authJwt.isUserOrAdmin],
    controller.deleteProductInCart
  );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
