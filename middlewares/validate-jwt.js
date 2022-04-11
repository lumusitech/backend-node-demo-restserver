const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "request was emitted without a token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res
        .status(401)
        .json({ msg: "invalid token - user was not found" });
    }

    if (!user.state) {
      return res.status(401).json({ msg: "invalid token - user state false" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "invalid token" });
  }
};

module.exports = {
  validateJWT,
};
