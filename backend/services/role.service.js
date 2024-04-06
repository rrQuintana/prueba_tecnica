const { models } = require('../utils/sequelize');

class RoleService {
  constructor() {
    this.Role = models.Role;
  }

  async create(data) {
    const role = await this.Role.create(data);
    return role;
  }

  async findAll() {
    const roles = await this.Role.findAll();
    return roles;
  }

  async findOne(id) {
    const role = await this.Role.findByPk(id);
    return role;
  }

  async update(id, data) {
    const role = await this.Role.findByPk(id);
    await role.update(data);
    return role;
  }

  async delete(id) {
    const role = await this.Role.findByPk(id);
    await role.destroy();
    return role;
  }
}

module.exports = RoleService;