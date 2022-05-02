import { GraphQLList, GraphQLString } from "graphql"
import { ClientType } from "../typedefs/Client"
import { Client } from '../../entities/Client'

export const GET_ALL_CLIENTS = {
    type: new GraphQLList(ClientType),
    args: {
        userId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { userId } = args
        if (context.user.id !== userId) throw new Error("The user who made the request is not the same as the one in the context.");

        const clientsToReturn: Client[] = []
        const clients = await Client.find({
            relations: ["contributors"],
        })
        clients.forEach((client) => {
            if (client.contributors.find((contrib) => contrib.id === context.user.id)) { clientsToReturn.push(client) }
        })
        return clientsToReturn;
    }
}
export const FIND_CLIENT_BY_ID = {
    type: ClientType,
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { id } = args
        const client = await Client.findOne({ id: id }, { relations: ["projects"] })
        if (!client) throw new Error("Cannot find client.")
        return client
    }
}
