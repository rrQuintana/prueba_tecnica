/**
 * Servicio que gestiona el proceso de inicio de sesión de los usuarios.
 * @module services/LoginService
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { models } = require('../utils/sequelize');

/**
 * Clase que representa el servicio de inicio de sesión.
 * @name LoginService
 */
class LoginService {
  /**
   * Crea una instancia del servicio de inicio de sesión.
   * @constructor
   */
  constructor() {
    this.User = models.User; // Modelo de usuario
  }

  /**
   * Inicia sesión para el usuario con las credenciales proporcionadas.
   * @async
   * @method login
   * @param {object} data - Datos de inicio de sesión, incluyendo email y password.
   * @returns {Promise<object>} - Promesa con un objeto con JWT y los datos del usuario autenticado.
   * @throws {Error} - Error lanzado si las credenciales son inválidas.
   */
  async login(data) {
    const { email, password } = data;

    // Busca un usuario por su email en la base de datos
    const user = await this.User.findOne({
      where: {
        email,
      },
    });

    // Comprueba si se encontró un usuario y si la contraseña es válida
    const isPasswordMatch = user === null
      ? false
      : await bcrypt.compare(password, user.password);

    // Lanza un error si las credenciales son inválidas
    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    // Genera un token JWT utilizando el ID de usuario y el ID de rol
    const token = jwt.sign(
      { id: user.id, roleId: user.roleId },
      process.env.JWT_SECRET,
    );

    // Determina el nombre del rol del usuario (Admin o User)
    const roleName = user.roleId === 1 ? 'Admin' : 'User';

    // Construye el objeto de respuesta que incluye el token JWT y los datos del usuario autenticado
    const response = {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        roleId: user.roleId,
        roleName,
      },
    };

    return response;
  }
}

module.exports = LoginService;
