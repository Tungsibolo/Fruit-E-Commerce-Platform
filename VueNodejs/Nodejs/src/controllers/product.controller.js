const db = require("../models");
const Product = db.product;

exports.getAllProducts = (req, res) => {
  Product.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving product with id=" + id,
        error: err.message,
      });
    });
};

exports.addProduct = (req, res) => {
  Product.create({
    name: req.body.product.name,
    price: req.body.product.price,
    category: req.body.product.category,
    imageUrl: req.body.product.image,
    description: req.body.product.description,
  })
    .then((product) => {
      res.status(200).send({ message: "Add product successfully", product });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
