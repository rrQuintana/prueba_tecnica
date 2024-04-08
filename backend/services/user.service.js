/* eslint-disable no-param-reassign */
/**
 * Servicio que gestiona las operaciones relacionadas con los usuarios.
 * @module services/UserService
 */

const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Role = require('../models/role.model');

/**
 * Clase que representa el servicio de usuarios.
 * @name UserService
 */
class UserService {
  /**
   * Crea una instancia del servicio de usuarios.
   * @constructor
   */
  constructor() {
    this.User = User; // Modelo de usuario
    this.Role = Role; // Modelo de rol
  }

  async create(data) {
    const { email, password } = data;

    const existingUser = await this.User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('El correo electrónico ya está en uso');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    data.password = hashedPassword;

    const user = await this.User.create(data);
    return user;
  }

  async findAll() {
    const users = await this.User.findAll({
      include: {
        model: this.Role,
        as: 'Role',
        attributes: ['name'],
        foreignKey: 'roleId',
      },
    });
    return users;
  }

  /**
   * Encuentra usuarios paginados según el índice de inicio y el tamaño de la página.
   * @async
   * @method findPaginatedUsers
   * @param {number} startIndex - Índice de inicio de la paginación.
   * @param {number} pageSize - Tamaño de la página.
   * @returns {Promise<Array>} - Promesa que resuelve con los usuarios paginados.
   * @throws {Error} - Error lanzado si hay problemas al buscar usuarios paginados.
   */
  async findPaginatedUsers(startIndex, pageSize, filters) {
    try {
      const users = await this.User.findAll({
        where: filters, // Aplicar los filtros aquí
        offset: startIndex,
        limit: pageSize,
        order: [['id', 'ASC']],
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

  async countAll(filters) {
    try {
      const totalUsers = await this.User.count({
        where: filters, // Aplicar los filtros aquí
      });
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

    if (!password || password === '') {
      // Si no se proporciona una nueva contraseña o se proporciona una cadena vacía,
      // mantener la contraseña actual del usuario
      data.password = user.password;
    } else {
      // Si se proporciona una nueva contraseña, hashearla y actualizarla
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
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
