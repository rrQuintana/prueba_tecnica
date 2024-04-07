const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Role = require('../models/role.model');

class UserService {
  constructor() {
    this.User = User;
    this.Role = Role;
  }

  async create(data) {
    const { password } = data;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // eslint-disable-next-line no-param-reassign
    data.password = hashedPassword;

    const user = await this.User.create(data);
    return user;
  }

  async findPaginatedUsers(startIndex, pageSize) {
    try {
      const users = await this.User.findAll({
        offset: startIndex,
        limit: pageSize,
        include: {
          model: this.Role,
          as: 'Role',
          attributes: ['name'],
          foreignKey: 'roleId',
        },
      });
      return users;
    } catch (error) {
      throw new Error(`Error al buscar usuarios paginados: ${error.message}`);
    }
  }

  async countAll() {
    try {
      const totalUsers = await this.User.count();
      return totalUsers;
    } catch (error) {
      throw new Error(`Error al contar usuarios: ${error.message}`);
    }
  }

  async findOne(id) {
    const user = await this.User.findByPk(id);
    return user;
  }

  async update(id, data) {
    const { password } = data;

    const user = await this.User.findByPk(id);

    if (user.password !== password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // eslint-disable-next-line no-param-reassign
      data.password = hashedPassword;
    }

    await user.update(data);
    return user;
  }

  async delete(id) {
    const user = await this.User.findByPk(id);
    await user.destroy();
    return user;
  }
}

module.exports = UserService;
