const getUsers = require('./getUsers');
const getUser = require('./getUser');
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const updateUser = require('./updateUser');

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}