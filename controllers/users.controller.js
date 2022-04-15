const { genSalt, hash } = require("bcryptjs");

const { User } = require("../models");

const getUsers = async (req, res) => {
  const { skip = 0, limit = 5, state = true } = req.query;

  const [users, count] = await Promise.all([
    User.find({ state }).skip(Number(skip)).limit(Number(limit)),
    User.find().countDocuments({ state }),
  ]);
  res.json({
    count,
    users,
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  res.json(user);
};

const postUsers = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = await genSalt();
  user.password = await hash(password, salt);

  await user.save();

  res.json(user);
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = await genSalt();
    rest.password = await hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    user,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const userDeleted = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    userDeleted,
  });
};

const realDeleteUser = async (req, res) => {
  const { id } = req.params;

  const userDeleted = await User.findByIdAndDelete(id);

  res.json({
    userDeleted,
  });
};

module.exports = {
  getUsers,
  getUser,
  postUsers,
  putUsers,
  deleteUser,
  realDeleteUser,
};
