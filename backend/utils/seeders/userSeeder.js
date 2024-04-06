const { User } = require('../../models/user.model');

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    password: 'password123',
    dateOfBirth: '1990-01-01',
    roleId: 1
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phoneNumber: '9876543210',
    password: 'password456',
    dateOfBirth: '1995-05-05',
    roleId: 2
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
