const { Router } = require("express");
const { param } = require("express-validator");

const {
  loadFileController,
  showImageController,
  updateImageCloudinaryController,
} = require("../controllers/uploads.controller");

const { allowedCollections } = require("../helpers");
const { validateFields, validateFileToUpload } = require("../middlewares");

const uploadsRouter = Router();

uploadsRouter.post("/", validateFileToUpload, loadFileController);

uploadsRouter.put(
  "/:collection/:id",
  [
    validateFileToUpload,
    param("id", "is not a mongo id").isMongoId(),
    param("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],

  updateImageCloudinaryController
);

uploadsRouter.get(
  "/:collection/:id",
  [
    param("id", "is not a mongo id").isMongoId(),
    param("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  showImageController
);

module.exports = uploadsRouter;
