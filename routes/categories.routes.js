const { Router } = require("express");
const { param, body } = require("express-validator");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");

const { categoryExistsById } = require("../helpers/db-validators");

const { validateJWT, isAdminRole, validateFields } = require("../middlewares");

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);

categoriesRouter.get(
  "/:id",
  [
    param("id", "is not a mongo id").isMongoId(),
    param("id").custom(categoryExistsById),
    validateFields,
  ],
  getCategory
);

categoriesRouter.post(
  "/",
  [
    validateJWT,
    body("name", "name is required").not().isEmpty(),
    body("name", "must be a String and min length 3")
      .isString()
      .isLength({ min: 3 }),
    isAdminRole,
    validateFields,
  ],
  createCategory
);

categoriesRouter.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    param("id", "is not a mongo id").isMongoId(),
    param("id").custom(categoryExistsById),
    body("name", "must be a String and min length 3")
      .isString()
      .isLength({ min: 3 })
      .optional(),
    body("state", "must be a boolean").isBoolean().optional(),
    validateFields,
  ],
  updateCategory
);

categoriesRouter.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    param("id", "is not a mongo id").isMongoId(),
    param("id").custom(categoryExistsById),
    validateFields,
  ],
  deleteCategory
);

module.exports = categoriesRouter;
