import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { ProjectType } from './Project'

export const ClientType: any = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        projects: { type: new GraphQLList(ProjectType) }
    })
})