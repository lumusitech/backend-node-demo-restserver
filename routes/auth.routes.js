const { Router } = require("express");
const { body } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const { login, googleSignIn } = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post(
  "/login",
  [
    body("email", "email is required").notEmpty(),
    body("email", "email with invalid format").isEmail(),
    body("password", "password is required").notEmpty(),
    validateFields,
  ],
  login
);

authRouter.post(
  "/google",
  [body("id_token", "id_token is required").notEmpty(), validateFields],
  googleSignIn
);

module.exports = authRouter;
