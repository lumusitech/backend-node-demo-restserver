const { Router } = require("express");
const { query, param, body } = require("express-validator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const {
  productExistsById,
  isValidCategory,
  productAlreadyRegistered,
} = require("../helpers/db-validators");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-roles");

const productRouter = Router();

productRouter.get(
  "/",
  [
    query("skip", "skip param must be a number").isNumeric().optional(),
    query("limit", "limit param must be a number").isNumeric().optional(),
    query("state", "state param must be a boolean").isBoolean().optional(),
    validateFields,
  ],
  getProducts
);

productRouter.get(
  "/:id",
  [
    param("id", "id param must be a valid Mongo id").isMongoId(),
    param("id").custom(productExistsById),
    validateFields,
  ],
  getProduct
);

productRouter.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    body("name", "name is required").not().isEmpty(),
    body("name", "name must be a String").isString(),
    body("name").custom(productAlreadyRegistered),
    body("price", "price is required").not().isEmpty().optional(),
    body("price", "price must be a Number").isNumeric().optional(),
    body("category", "category is required").not().isEmpty(),
    body("category").custom(isValidCategory),
    body("description", "description must be a String").isString().optional(),
    body("description", "description length must be greater than 3")
      .isLength({ min: 3 })
      .optional(),
    validateFields,
  ],
  createProduct
);

productRouter.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    param("id", "id param must be a valid Mongo id").isMongoId(),
    param("id").custom(productExistsById),
    body("name", "name is required").not().isEmpty().optional(),
    body("name", "name must be a String").isString().optional(),
    body("price", "price is required").not().isEmpty().optional(),
    body("price", "price must be a Number").isNumeric().optional(),
    body("category", "category is required").not().isEmpty().optional(),
    body("category").custom(isValidCategory).optional(),
    validateFields,
  ],
  updateProduct
);

productRouter.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    param("id", "id param must be a valid Mongo id").isMongoId(),
    param("id").custom(productExistsById),
    validateFields,
  ],
  deleteProduct
);
module.exports = productRouter;
