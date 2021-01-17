const register = require('./register');
const login = require('./login');
const getMe = require('./getMe');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const updateDetails = require('./updateDetails');
const updatePassword = require('./updatePassword');
const logout = require('./logout');

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout
}