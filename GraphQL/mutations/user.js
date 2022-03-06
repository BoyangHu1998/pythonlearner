const { UserType } = require("../types");
const Users = require('../../data-sources/user')
const { GraphQLString, GraphQLID, GraphQLList, GraphQLError } = require("graphql");
const { encrypt } = require('../../util/encrypUtil');


const updateUser = {
    type: UserType,
    description: "Update user info",
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        avatar: { type: GraphQLString },
        accessModules: { type: new GraphQLList(GraphQLString) }
    },
    async resolve(parent, args, { verifiedUser }) {
        if (!verifiedUser) throw new Error("Unauthorized")
        let newUserData = { ...args }
        if (newUserData.password) {
            const encryptedPassword = await encrypt(newUserData.password);
            newUserData.password = encryptedPassword;
        }
        return await Users.update(args.id, newUserData);
    }
}


module.exports = { updateUser }