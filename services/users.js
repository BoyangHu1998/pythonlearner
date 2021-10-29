'use strict';

const { Template } = require('ejs');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

exports.create = async (data) => {
    const User = mongoose.model('Users');
    let newUser = new User(data);
    return await newUser.save();
}

exports.findById = async (id) => {
    return await User.findById(id);
}

exports.find = async (query, option) => {
    return await User.find(query, option);
}
exports.findByIds = async (ids) => {
    return await User.find({ _id: { $in: ids } });
}

exports.findByCondition = async (query, option) => {
    return await User.find(query, option);
}

exports.findAll = async (option) => {
    return await User.find();
}

exports.update = async (id, body) => {
    let document = {
        $set: body
    }
    return await User.findOneAndUpdate({ _id: id }, document, { new: true });
}