import { GraphQLObjectType, GraphQLString } from 'graphql'
import { ClientType } from './Client'

export const ActionType: any = new GraphQLObjectType({
    name: "Action",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        accountable: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        project: { type: ClientType },
    })
})