const express = require("express");
const roleRouter = express.Router();
const roleController = require("../controllers/role.controller");

roleRouter
  .post("/", roleController.createRole)
  .get("/", roleController.getRoles)
  .get("/:id", roleController.getRole)
  .put("/:id", roleController.updateRole)
  .delete("/:id", roleController.deleteRole);

module.exports = roleRouter;