import { MessageType } from "../typedefs/Message";
import gravatar from "gravatar"
import { GraphQLID, GraphQLString } from "graphql";
import { User } from '../../entities/User'
const { v4: uuid } = require("uuid");

export const CREATE_USER = {
    type: MessageType,
    args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        avatarUrl: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const newuuid = uuid()
        const { firstname, lastname, email, avatarUrl, username, password } = args
        const avatar = gravatar.url(
            email,
            { s: "100", r: "x", d: "retro" },
            true
        );
        await User.insert({ id: newuuid, firstname, lastname, email, avatarUrl: avatarUrl ? avatarUrl : avatar, username, password, maxCaractersCard: 65 })
        return { successful: true, message: newuuid }
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
        email: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { email, oldPassword, newPassword } = args
        const user = await User.findOne({ email: email })
        const userPassword = user?.password;
        if (!user) throw new Error("Cannot find user.")

        if (oldPassword === userPassword) {
            await User.update({ email: email }, { password: newPassword })
            return { successful: true, message: "Password was successfully updated." }

        } else {
            throw new Error("Passwords do not match.")
        }
    }
}
export const UPDATE_AVATAR = {
    type: MessageType,
    args: {
        email: { type: GraphQLString },
        avatarUrl: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { email, avatarUrl } = args
        const user = await User.findOne({ email: email })
        if (!user) throw new Error("Cannot find user.")
        await User.update({ email: email }, { avatarUrl: avatarUrl })
        return { successful: true, message: "Avatar was successfully updated." }
    }
}
export const LOGIN = {
    type: MessageType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { email, password } = args
        const user = await User.findOne({ where: { email: email } });
        if (!user)
            return { successful: false, message: "Impossible de trouver l'utilisateur." }

        else {
            if (password === user.password) {
                return { successful: true, message: user.id }
            }
            else return { successful: false, message: "Le mot de passe est incorrect." }

        }
    }
}
export const UPDATE_MAX_CARACTER_NB = {
    type: MessageType,
    args: {
        id: { type: GraphQLString },
        number: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, number } = args
        const user = await User.findOne({ id: id })
        if (!user) throw new Error("Cannot find user.")

        await User.update({ id: id }, { maxCaractersCard: number })
        return { successful: true, message: "maxCaractersCard was successfully updated." }
    }
}