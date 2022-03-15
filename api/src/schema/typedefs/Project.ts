import { GraphQLObjectType, GraphQLString } from 'graphql'
import { ClientType } from './Client'

export const ProjectType: any = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        client: { type: ClientType },
    })
})