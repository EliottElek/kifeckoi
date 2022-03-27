import { ClientType } from "../typedefs/Client";

const { v4: uuid } = require("uuid");
import { GraphQLString } from "graphql";
import { Client } from '../../entities/Client'

export const CREATE_CLIENT = {
    type: ClientType,
    args: {
        name: { type: GraphQLString },
        id: { type: GraphQLString },
    },

    async resolve(parent: any, args: any) {
        const newid = uuid();
        const { name } = args
        await Client.insert({ name: name, projects: [], id: newid })
        return { ...args, id: newid }
    }
}
