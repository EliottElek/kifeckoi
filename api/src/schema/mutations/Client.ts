import { ClientType } from "../typedefs/Client";

const { v4: uuid } = require("uuid");
import { GraphQLString } from "graphql";
import { Client } from '../../entities/Client'
import { User } from "../../entities/User";

export const CREATE_CLIENT = {
    type: ClientType,
    args: {
        name: { type: GraphQLString },
        id: { type: GraphQLString },
        userId: { type: GraphQLString }
    },

    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const newid = uuid();
        const { name, userId } = args
        if (context.user.id !== userId) throw new Error("The user who made the request is not the same as the one in the context.");

        const user = await User.findOne({ id: context.user.id })
        if (!user) throw new Error("Cannot fidn user.")
        const client = Client.create({
            name: name, projects: [], id: newid, contributors: [], creation: new Date().toString()
        })
        client.creator = user
        client.contributors.push(user)
        Client.save(client)
        return { ...args, id: newid }
    }
}
