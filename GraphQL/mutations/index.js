const { register, login } = require('./auth');
const { updateUser } = require('./user');

module.exports = {
    register, login,
    updateUser,
}
