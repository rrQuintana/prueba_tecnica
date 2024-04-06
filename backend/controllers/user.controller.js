const UserService = require('../services/user.service');
const userService = new UserService();

const createUser = async (req, res, next) => {
  const user = await userService.create(req.body);
  res.json(user);
}

const getUsers = async (req, res, next) => {
  const users = await userService.findAll();
  res.json(users);
}

const getUser = async (req, res, next) => {
  const user = await userService.findOne(req.params.id);
  res.json(user);
}

const updateUser = async (req, res, next) => {
  const user = await userService.update(req.params.id, req.body);
  res.json(user);
}

const deleteUser = async (req, res) => {
  const user = await userService.delete(req.params.id);
  res.json(user);
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};