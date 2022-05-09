import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { ProjectType } from './Project'
import { UserType } from './User'

export const ClientType: any = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        projects: { type: new GraphQLList(ProjectType) },
        contributors: { type: new GraphQLList(UserType) },
        creation: { type: GraphQLString },
        creator: { type: UserType },

    })
})