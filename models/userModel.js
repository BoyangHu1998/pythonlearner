/**
 * MongoDB
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    accessModules: {
        type: [String],
        required: false
    }
});

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(uniqueValidator);
UserSchema.set('timestamps', true);
module.exports = mongoose.model('Users', UserSchema);  // ??????????wo fu le, jing ran zai zhe
