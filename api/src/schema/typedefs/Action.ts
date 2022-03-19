import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { ProjectType } from './Project'
import { UserType } from './User'

export const ActionType: any = new GraphQLObjectType({
    name: "Action",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        project: { type: ProjectType },
        projectId: { type: GraphQLString },
        accountables: { type: new GraphQLList(UserType) }
    })
})