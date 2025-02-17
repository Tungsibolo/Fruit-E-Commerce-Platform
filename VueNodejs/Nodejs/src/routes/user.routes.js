const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllAccountUsers
  );

  app.get(
    "/api/getaccountbyid/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findById
  );

  app.get(
    "/api/usersbyemail",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findByEmail
  );

  app.delete(
    "/api/userdeletebyid/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteById
  );

  app.put(
    "/api/updateaccountbyid/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateById
  );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
