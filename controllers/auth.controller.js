const { compare } = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");

const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "email or password are wrong - email" });
    }

    if (!user.state) {
      return res
        .status(400)
        .json({ msg: "email or password are wrong - state: false" });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.json({ msg: "email or password are wrong - password" });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "contact admin" });
  }
};

module.exports = {
  login,
};
