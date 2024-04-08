const LoginService = require('../services/login.service');

const loginService = new LoginService();

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const loginResponse = await loginService.login({ email, password });

    res.status(200).json(loginResponse);
  } catch (error) {
    if (error.message === 'Credenciales inválidas') {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
    next(error);
  }
}

module.exports = {
  login,
};
