const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { dbConnection } = require("../database/config");

const usersRouter = require("../routes/users.routes");
const authRouter = require("../routes/auth.routes");

class Server {
  constructor() {
    this.app = express();
    this.basePath = "/api/v1";
    this.usersPath = "users";
    this.authPath = "auth";
    this.port = process.env.PORT;
    this.setDB();
    this.setMiddlewares();
    this.setStatics();
    this.setRoutes();
  }

  setDB() {
    dbConnection();
  }

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  setStatics() {
    this.app.use(express.static("public"));
  }

  setRoutes() {
    this.app.use(`${this.basePath}/${this.authPath}`, authRouter);
    this.app.use(`${this.basePath}/${this.usersPath}`, usersRouter);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
