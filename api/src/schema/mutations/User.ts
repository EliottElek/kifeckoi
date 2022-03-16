import { UserType } from "../typedefs/User";
import { MessageType } from "../typedefs/Message";

import { GraphQLID, GraphQLString } from "graphql";
import { User } from '../../entities/User'
export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { name, username, password } = args
        await User.insert({ name, username, password })
        return args
    }
}

export const DELETE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
        const id = args.id
        await User.delete(id)
        return { successful: true, message: "User was successfully deleted." }
    }
}
export const UPDATE_PASSWORD = {
    type: MessageType,
    args: {
        username: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { username, oldPassword, newPassword } = args
        const user = await User.findOne({ username: username })
        const userPassword = user?.password;
        if (!user) throw new Error("Cannot find user.")

        if (oldPassword === userPassword) {
            await User.update({ username: username }, { password: newPassword })
            return { successful: true, message: "Password was successfully updated." }

        } else {
            throw new Error("Passwords do not match.")
        }
    }
}