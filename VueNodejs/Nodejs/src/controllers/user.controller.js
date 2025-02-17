const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.getAllAccountUsers = (req, res) => {
  User.findAll({
    attributes: ["id", "email", "username"],
    include: [
      {
        model: Role, // Tham chiếu tới bảng Role
        attributes: ["name"], // Chỉ lấy cột name từ bảng roles
        through: { attributes: [] }, // Không lấy dữ liệu từ bảng trung gian
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user accounts.",
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: [
      {
        model: Role,
        through: "user_roles",
        attributes: ["name"], // Chỉ lấy tên role, tránh lấy thông tin thừa
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
        error: err.message,
      });
    });
};

exports.findByEmail = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user by email",
      });
    });
};

exports.deleteById = (req, res) => {
  const id = req.params.id;
  console.log("deletebyid:", id);
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User account was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete user account with id=${id}. Maybe user account was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete account user with id=" + id,
      });
    });
};

exports.updateById = async (req, res) => {
  const id = req.params.id;

  try {
    // 1. Cập nhật thông tin User
    const [num] = await User.update(req.body, { where: { id: id } });

    if (num === 1) {
      // 2. Nếu có dữ liệu roles trong req.body, cập nhật roles
      if (req.body.roles) {
        // Tìm user hiện tại
        const user = await User.findByPk(id);

        if (!user) {
          return res
            .status(404)
            .send({ message: `User not found with id=${id}` });
        }

        // Tìm tất cả các roles theo danh sách roles từ req.body
        const roles = await Role.findAll({
          where: { name: req.body.roles }, // req.body.roles là danh sách role dạng ["Admin", "User"]
        });

        // Cập nhật roles của user (Sequelize sẽ cập nhật bảng trung gian `user_roles`)
        await user.setRoles(roles);
      }

      res.send({
        message: "User account was updated successfully, including roles.",
      });
    } else {
      res.send({
        message: `Cannot update User account with id=${id}. Maybe User account was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating User account with id=" + id,
      error: err.message,
    });
  }
};

// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };
