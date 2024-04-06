const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");

userRouter
  .post("/", userController.createUser)
  .get("/", userController.getUsers)
  .get("/:id", userController.getUser)
  .put("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

module.exports = userRouter;