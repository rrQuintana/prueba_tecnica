const { User } = require('../../models/user.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'example1@example.com',
    phoneNumber: '1234567890',
    password: hashPassword('password123'),
    dateOfBirth: '1990-01-01',
    roleId: 1 // Admin
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'example2@example.com',
    phoneNumber: '9876543210',
    password: hashPassword('password123'),
    dateOfBirth: '1995-05-05',
    roleId: 2 // User
  },
];

async function seedUsers() {
  try {
    await User.sync({ force: true });

    await User.truncate({ cascade: true });
    await User.bulkCreate(users);

    console.log('Usuarios sembrados correctamente');
  } catch (error) {
    console.error('Error al sembrar usuarios:', error);
  }
}

module.exports = seedUsers;