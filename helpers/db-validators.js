const Role = require("../models/role");
const User = require("../models/user");

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
  const userWasDeleted = await User.find({ id, state: false });

  if (userWasDeleted) {
    throw new Error(`User with id ${id} is not exists or already was deleted`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  userExistsById,
  userBeforeDeleted,
};
