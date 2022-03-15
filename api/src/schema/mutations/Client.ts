import { ClientType } from "../typedefs/Client";
import { ProjectType } from "../typedefs/Project";

const { v4: uuid } = require("uuid");
import { GraphQLString, GraphQLList } from "graphql";
import { Client } from '../../entities/Client'

export const CREATE_CLIENT = {
    type: ClientType,
    args: {
        name: { type: GraphQLString },
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { name } = args
        await Client.insert({ name: name, projects: [], id: uuid() })
        return args
    }
}
