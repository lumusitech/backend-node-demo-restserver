const Category = require("../models/category");

const getCategories = async (req, res) => {
  const { skip = 0, limit = 5, state = true } = req.query;

  const [count, categories] = await Promise.all([
    await Category.countDocuments({ state }),
    await Category.find({ state })
      .skip(Number(skip))
      .limit(Number(limit))
      .populate("user", "name -_id"),
  ]);

  res.json({
    count,
    categories,
  });
};

const getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("user", "name -_id");

  res.json({
    category,
  });
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  let category = await Category.findOne({ name });

  if (category) {
    return res.status(401).json({
      mgs: "category name already exists",
    });
  }

  category = new Category({
    name,
    user: req.user._id,
  });

  category.save();

  res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { _id, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  res.json(category);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(category);
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
