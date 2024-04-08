const { Op } = require('sequelize');
const UserService = require('../services/user.service');

const userService = new UserService();

const createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.json(user);
};

const getAllUsers = async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
};

const getUsers = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const pageSize = 5;
    const queryFilters = {};

    if (req.query.role) {
      queryFilters.roleId = req.query.role;
    }

    if (req.query.search) {
      const searchValue = req.query.search.trim();

      queryFilters[Op.or] = [
        { email: { [Op.iLike]: `%${searchValue}%` } },
        { firstName: { [Op.iLike]: `%${searchValue}%` } },
        { lastName: { [Op.iLike]: `%${searchValue}%` } },
        { phoneNumber: { [Op.iLike]: `%${searchValue}%` } },
      ];
    }

    const totalUsers = await userService.countAll(queryFilters);

    const totalPages = Math.ceil(totalUsers / pageSize);

    const startIndex = (page - 1) * pageSize;

    const users = await userService.findPaginatedUsers(startIndex, pageSize, queryFilters);

    const response = {
      page,
      totalPages,
      pageSize,
      totalUsers,
      users,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res) => {
  const user = await userService.findOne(req.params.id);
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await userService.delete(req.params.id);
  res.json(user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
