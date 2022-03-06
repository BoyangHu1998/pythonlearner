const { UserType } = require("../types");
const { GraphQLString, GraphQLID } = require("graphql");
const User = require("../../models/userModel");
const Users = require('../../data-sources/user')

const { encrypt, compareEncryption } = require('../../util/encrypUtil');
const { generateToken } = require("../../util/tokenUtil");
const config = require('../../config');
const jwtExpirySeconds = config.jwt_expiry_seconds;

const register = {
    type: UserType,
    description: "Register user",
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const { name, email, password, phone } = args;
        const encryptedPassword = await encrypt(password);
        const userData = { name, email, phone }
        userData.password = encryptedPassword;
        return await Users.create(userData);
    }
}

const login = {
    type: GraphQLString,
    description: "Login user",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email }).select("+password")

        const validation = user ? await compareEncryption(args.password, user.password) : false;

        if (!user || !validation) {
            throw new Error("Invalid credentials")
        }

        let data = user.toJSON();
        delete data.password;
        const token = generateToken(data, jwtExpirySeconds)
        return token
    },
}

module.exports = { register, login }