const { model, Schema } = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    require: [true, "product name is required"],
    unique: [true, "product name must be unique"],
  },
  price: {
    type: Number,
    default: 0,
  },
  available: {
    type: Boolean,
    require: [true, "available param is required"],
    default: true,
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: [true, "user is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: [true, "category is required"],
  },
  description: {
    type: String,
  },
  state: {
    type: Boolean,
    require: [true, "state is required"],
    default: true,
  },
});

productSchema.methods.toJSON = function () {
  const { _id, __v, user, category, ...restToShow } = this.toObject();

  const userToShow = {
    uid: user._id,
    name: user.name,
  };

  const categoryToShow = {
    uid: category._id,
    name: category.name,
  };

  return {
    uid: _id,
    user: userToShow,
    category: categoryToShow,
    ...restToShow,
  };
};

module.exports = model("Product", productSchema);
