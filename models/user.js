const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "role is required"],
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE", "SELLER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, _id, password, ...userToShow } = this.toObject();
  return { uid: _id, ...userToShow };
};

module.exports = model("User", userSchema);
