const res = require("express/lib/response");
const Category = require("../models/category");
const Product = require("../models/product");
const Role = require("../models/role");
const User = require("../models/user");

/**
 *
 * USER
 */
const isValidRole = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) throw new Error(`role ${role} is not registered in DB`);
};

const emailExists = async (email = "") => {
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error(`email already registered`);
  }
};

const userExistsById = async (id = "") => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`id: ${id} is not exists`);
  }
};

const userBeforeDeleted = async (id = "") => {
  const userToDelete = await User.findById(id);

  if (userToDelete.state === false) {
    throw new Error(`User with id ${id} is not exists or already was deleted`);
  }
};

/**
 *
 * CATEGORY
 */
const categoryExistsById = async (id = "") => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`category with id ${id} is not found`);
  }
};

/**
 *
 * PRODUCT
 */
const productExistsById = async (id = "") => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(`product with id ${id} is not found`);
  }
};

const productAlreadyRegistered = async (name = "") => {
  const product = await Product.findOne({ name: name.toUpperCase() });

  if (product) {
    throw new Error(`product with name ${product.name} is already registered`);
  }
};

const isValidCategory = async (name = "") => {
  const category = await Category.findOne({ name: name.toUpperCase() });

  if (!category) {
    throw new Error(`category with name ${name} is invalid`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  userExistsById,
  userBeforeDeleted,
  categoryExistsById,
  productExistsById,
  isValidCategory,
  productAlreadyRegistered,
};
