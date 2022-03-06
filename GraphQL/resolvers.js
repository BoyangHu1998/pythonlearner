const User = require('../models/userModel')
const Users = require('../data-sources/user')
const { encrypt, compareEncryption } = require('../util/encrypUtil');
const { generateToken } = require("../util/tokenUtil");
const config = require('../config');
const jwtExpirySeconds = config.jwt_expiry_seconds;

const resolvers = {
    Query:  {
        // async users() {}
        users: async (parent, args, { verifiedUser }, info) => {
            if (!verifiedUser) throw new Error("Unauthorized")
            return await User.findAll();
        },

        user: async (parent, args, { verifiedUser }) => {
            if (!verifiedUser) throw new Error("Unauthorized")
            return await User.findById(args.id);
        }   
    },

    Mutation: {
        register: async (parent, args) => {
            const { name, email, password, phone } = args;
            const encryptedPassword = await encrypt(password);
            const userData = { name, email, phone }
            userData.password = encryptedPassword;
            return await Users.create(userData);
        },

        login: async (parent, args) => {
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

        updateUser: async (parent, args, { verifiedUser }, info) => {
            if (!verifiedUser) throw new Error("Unauthorized")
            let newUserData = { ...args }
            if (newUserData.password) {
                const encryptedPassword = await encrypt(newUserData.password);
                newUserData.password = encryptedPassword;
            }
            return await Users.update(args.id, newUserData);
        },
    },
}

module.exports = resolvers
