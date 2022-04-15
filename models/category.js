const { model, Schema } = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, "category name is required"],
    unique: [true, "category name must be unique"],
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, "state is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"],
  },
});

categorySchema.methods.toJSON = function () {
  const { _id, __v, ...restToShow } = this.toObject();

  return {
    uid: _id,
    ...restToShow,
  };
};

module.exports = model("Category", categorySchema);
