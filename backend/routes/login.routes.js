const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/login.controller");

loginRouter.post("/", loginController.login);

module.exports = loginRouter;