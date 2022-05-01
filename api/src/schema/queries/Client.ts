import { GraphQLList, GraphQLString } from "graphql"
import { ClientType } from "../typedefs/Client"
import { Client } from '../../entities/Client'

export const GET_ALL_CLIENTS = {
    type: new GraphQLList(ClientType),
    args: {
        userId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { userId } = args
        const clientsToReturn: Client[] = []
        const clients = await Client.find({
            relations: ["contributors"],
        })
        clients.forEach((client) => {
            if (client.contributors.find((contrib) => contrib.id === userId)) { clientsToReturn.push(client) }
        })
        return clientsToReturn;
    }
}
export const FIND_CLIENT_BY_ID = {
    type: ClientType,
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id } = args
        const client = await Client.findOne({ id: id }, { relations: ["projects"] })
        if (!client) throw new Error("Cannot find client.")
        return client
    }
}
