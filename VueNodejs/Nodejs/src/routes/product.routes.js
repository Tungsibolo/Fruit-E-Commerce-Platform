const controller = require("../controllers/product.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/getallproducts", controller.getAllProducts);

  app.get("/api/getproductbyid/:id", controller.findById);

  app.post(
    "/api/addProduct",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addProduct
  );
};
