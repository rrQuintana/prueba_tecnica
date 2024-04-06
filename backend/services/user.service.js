const { models } = require('../utils/sequelize');

class UserService {
  constructor() {
    this.User = models.User;
    this.Role = models.Role;
  }

  async create(data) {
    const user = await this.User.create(data);
    return user;
  }

  async findAll() {
    const users = await this.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await this.User.findByPk(id);
    return user;
  }

  async update(id, data) {
    const user = await this.User.findByPk(id);
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