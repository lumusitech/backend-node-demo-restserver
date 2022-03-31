const { Router } = require("express");
const { body, param } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUser,
  realDeleteUser,
  getUser,
} = require("../controllers/users.controller");

const {
  isValidRole,
  emailExists,
  userExistsById,
  userBeforeDeleted,
} = require("../helpers/db-validators");

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get(
  "/:id",
  [
    param("id", "is not a mongo id").isMongoId(),
    param("id").custom(userExistsById),
    validateFields,
  ],
  getUser
);

usersRouter.post(
  "/",
  [
    body("name", "name is required").notEmpty(),
    body("email", "email is invalid").isEmail(),
    body("email").custom(emailExists),
    body("password", "password should be min length 6").isLength({ min: 6 }),
    body("role").custom(isValidRole),
  ],
  validateFields,
  postUsers
);

usersRouter.put(
  "/:id",
  [
    param("id", "is not a mongo id").isMongoId(),
    param("id").custom(userExistsById),
    body("role").custom(isValidRole),
    validateFields,
  ],
  putUsers
);

usersRouter.delete(
  "/:id",
  [
    param("id", "is not a mongo id").isMongoId(),
    param("id").custom(userExistsById),
    param("id").custom(userBeforeDeleted),
    validateFields,
  ],
  deleteUser
);
usersRouter.delete(
  "/real-delete/:id",
  [
    param("id", "is not a mongo id").isMongoId(),
    param("id").custom(userExistsById),
    validateFields,
  ],
  realDeleteUser
);

module.exports = usersRouter;
