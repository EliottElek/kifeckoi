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

    async resolve(parent: any, args: any) {
        const newid = uuid();
        const { name, userId } = args
        const user = await User.findOne({ id: userId })
        if (!user) throw new Error("Cannot fidn user.")
        const client = Client.create({ name: name, projects: [], id: newid, contributors: [] })
        client.contributors.push(user)
        Client.save(client)
        return { ...args, id: newid }
    }
}
