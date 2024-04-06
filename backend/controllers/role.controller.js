const RoleService = require('../services/role.service');
const roleService = new RoleService();

const createRole = async (req, res, next) => {
  const role = await roleService.create(req.body);
  res.json(role);
}

const getRoles = async (req, res, next) => {
  const roles = await roleService.findAll();
  res.json(roles);
}

const getRole = async (req, res, next) => {
  const role = await roleService.findOne(req.params.id);
  res.json(role);
}

const updateRole = async (req, res, next) => {
  const role = await roleService.update(req.params.id, req.body);
  res.json(role);
}

const deleteRole = async (req, res, next) => {
  const role = await roleService.delete(req.params.id);
  res.json(role);
}

module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};