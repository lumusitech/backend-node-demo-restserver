const Product = require("../models/product");
const Category = require("../models/category");
const { populate } = require("../models/product");

const getProducts = async (req, res) => {
  const { skip = 0, limit = 5, state = true } = req.query;

  const [count, products] = await Promise.all([
    await Product.countDocuments({ state }),
    await Product.find({ state })
      .skip(Number(skip))
      .limit(Number(limit))
      .populate("user")
      .populate("category"),
  ]);

  res.json({
    count,
    products,
  });
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user")
    .populate("category");

  res.json(product);
};

const createProduct = async (req, res) => {
  const { category, state, user, name, ...rest } = req.body;

  const categoryFound = await Category.findOne({
    name: category.toUpperCase(),
  });

  const product = new Product({
    user: req.user._id,
    category: categoryFound._id,
    name: name.toUpperCase(),
    ...rest,
  });

  product.save();

  res.json({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;

  if (name) {
    name.toUpperCase();
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { name, category, price },
    { new: true }
  );

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
