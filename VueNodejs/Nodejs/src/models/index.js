const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Khởi tạo Sequelize
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  timezone: config.timezone,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

// Định nghĩa db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import Models
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.cart = require("../models/cart.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.orderItem = require("../models/order.item.model.js")(sequelize, Sequelize);

// 🔹 Thiết lập quan hệ User - Role (Nhiều-Nhiều)
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// 🔹 Thiết lập quan hệ User - Cart (Một-Nhiều, 1 User có nhiều sản phẩm trong giỏ)
db.user.hasMany(db.cart, { foreignKey: "userId", onDelete: "CASCADE" });
db.cart.belongsTo(db.user, { foreignKey: "userId" });

// 🔹 Thiết lập quan hệ Cart - Product (Một-Nhiều, 1 CartItem tương ứng với 1 Product)
db.product.hasMany(db.cart, { foreignKey: "productId", onDelete: "CASCADE" });
db.cart.belongsTo(db.product, { foreignKey: "productId" });

db.order.hasMany(db.orderItem, { foreignKey: "orderId" });
db.orderItem.belongsTo(db.order, { foreignKey: "orderId" });
db.orderItem.belongsTo(db.product, { foreignKey: "productId" });

// Danh sách quyền
db.ROLES = ["user", "admin"];

module.exports = db;
