const LoginService = require('../services/login.service');

const loginService = new LoginService();

const login = async (req, res) => {
  const response = await loginService.login(req.body);
  res.json(response);
};

module.exports = {
  login,
};
