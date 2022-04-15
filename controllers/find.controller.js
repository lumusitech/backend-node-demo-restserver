const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Category, Product } = require("../models");

const allowCollections = ["users", "categories", "products"];

const isMongoId = (query) => isValidObjectId(query);

const findUsers = async (query = "", res = response) => {
  if (isMongoId(query)) {
    const user = await User.findById(query);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(query, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({ results: users });
};

const findCategories = async (query = "", res = response) => {
  if (isMongoId(query)) {
    const category = await Category.findById(query);
    return res.json({ results: categories ? [category] : [] });
  }

  const regexp = new RegExp(query, "i");

  const categories = await Category.find({
    name: regexp,
    state: true,
  }).populate("user");

  res.json({ results: categories ? [categories] : [] });
};

const findProducts = async (query = "", res = response) => {
  if (isMongoId(query)) {
    const product = await Product.findById(query);
    return res.json({ results: product ? [product] : [] });
  }

  const regexp = RegExp(query, "i");
  const products = await Product.find({ name: regexp, state: true })
    .populate("user")
    .populate("category");

  res.json({ results: products ? [products] : [] });
};

const find = async (req, res) => {
  const { collection, query } = req.params;

  const validCollection = allowCollections.includes(collection);

  if (!validCollection) {
    return res.status(400).json({ msg: `Collection ${collection} is invalid` });
  }

  switch (collection) {
    case "users":
      findUsers(query, res);
      break;

    case "categories":
      findCategories(query, res);
      break;

    case "products":
      findProducts(query, res);
      break;

    default:
      res.status(500).json({ msg: "not implemented" });
  }
};

module.exports = {
  find,
};
