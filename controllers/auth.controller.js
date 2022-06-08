const { compare } = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { name, email, picture } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        img: picture,
        password: "comeFromGoogle",
        google: true,
      });

      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({ msg: "user not allowed, contact admin" });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, msg: "token can not verified" });
  }
};

module.exports = {
  login,
  googleSignIn,
};
