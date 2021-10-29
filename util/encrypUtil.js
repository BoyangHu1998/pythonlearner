
const { saltRounds } = require('../config')
const bcrypt = require('bcrypt');

exports.encrypt = async (data) => {
    return await bcrypt.hash(data, saltRounds);
}

exports.compareEncryption = async (data, hash) => {
    return await bcrypt.compare(data, hash);
}