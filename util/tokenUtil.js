'use strict';

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync(path.resolve(__dirname, '../config/jwtRS256.key'));
const cert = fs.readFileSync(path.resolve(__dirname, '../config/jwtRS256.key.pub'));

const httpExceptions = require('../exceptions/HttpExceptions'); // never used?
exports.generateToken = function (data, expiresIn) {
    return jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: expiresIn });
}

exports.analysisToken = async (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
    try {
        const payload = jwt.verify(token, cert);
        req.verifiedUser = payload;
        console.log('Verification success!', payload);
        next();
    } catch (e) {
        req.verifiedUser = false;
        console.log('Verification failed!');
        next();
    }
}