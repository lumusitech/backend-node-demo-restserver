const express = require("express");
const cors = require("cors");
const usersRouter = require("../routes/users.routes");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.basePath = "/api/v1";
    this.usersPath = "users";
    this.port = process.env.PORT;
    this.setMiddlewares();
    this.setStatics();
    this.setRoutes();
  }

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  setStatics() {
    this.app.use(express.static("public"));
  }

  setRoutes() {
    this.app.use(`${this.basePath}/${this.usersPath}`, usersRouter);
  }

  start() {
    this.app.listen(this.port || 5000, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
