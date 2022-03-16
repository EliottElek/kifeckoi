import { GraphQLObjectType, GraphQLString } from 'graphql'
import { ProjectType } from './Project'

export const InfoType: any = new GraphQLObjectType({
    name: "Info",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        accountable: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        project: { type: ProjectType },
    })
})