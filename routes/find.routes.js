const { Router } = require("express");
const { find } = require("../controllers/find.controller");

const findRouter = Router();

findRouter.get("/:collection/:query", find);

module.exports = findRouter;
