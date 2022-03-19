import { GraphQLObjectType, GraphQLString } from 'graphql'
import { ProjectType } from './Project'

export const DecisionType: any = new GraphQLObjectType({
    name: "Decision",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        accountable: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        project: { type: ProjectType },
    })
})