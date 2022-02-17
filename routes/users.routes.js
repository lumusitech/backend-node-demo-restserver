const { Router } = require("express");
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getUser,
} = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/", postUsers);
usersRouter.put("/:id", putUsers);
usersRouter.delete("/:id", deleteUsers);

module.exports = usersRouter;
