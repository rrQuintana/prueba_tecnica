const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { models } = require('../utils/sequelize');

class LoginService {
  constructor() {
    this.User = models.User;
  }

  async login(data) {
    const { email, password } = data;

    const user = await this.User.findOne({
      where: {
        email,
      },
    });

    const isPasswordMatch = user === null
      ? false
      : await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, roleId: user.roleId },
      process.env.JWT_SECRET,
    );

    const roleName = user.roleId === 1 ? 'Admin' : 'User';

    const respose = {
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

    return respose;
  }
}

module.exports = LoginService;
