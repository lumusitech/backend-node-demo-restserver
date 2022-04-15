const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { dbConnection } = require("../database/config");

const authRouter = require("../routes/auth.routes");
const categoriesRouter = require("../routes/categories.routes");
const findRouter = require("../routes/find.routes");
const usersRouter = require("../routes/users.routes");
const productsRouter = require("../routes/products.routes");

class Server {
  constructor() {
    this.app = express();
    this.paths = {
      auth: "auth",
      base: "/api/v1",
      categories: "categories",
      find: "find",
      products: "products",
      users: "users",
    };
    this.port = process.env.PORT;
    this.setDB();
    this.setMiddlewares();
    this.setRoutes();
  }

  setDB() {
    dbConnection();
  }

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  setRoutes() {
    this.app.use(`${this.paths.base}/${this.paths.auth}`, authRouter);

    this.app.use(
      `${this.paths.base}/${this.paths.categories}`,
      categoriesRouter
    );

    this.app.use(`${this.paths.base}/${this.paths.find}`, findRouter);

    this.app.use(`${this.paths.base}/${this.paths.products}`, productsRouter);

    this.app.use(`${this.paths.base}/${this.paths.users}`, usersRouter);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
