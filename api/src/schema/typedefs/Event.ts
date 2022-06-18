import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { CommentType } from './Comment'
import { ProjectType } from './Project'
import { UserType } from './User'

export const EventType: any = new GraphQLObjectType({
    name: "Event",
    fields: () => ({
        id: { type: GraphQLString },
        index: { type: GraphQLInt },
        type: { type: GraphQLString },
        period: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        project: { type: ProjectType },
        projectId: { type: GraphQLString },
        creation: { type: GraphQLString },
        creator: { type: UserType },
        targetDate: { type: GraphQLString },
        state: { type: GraphQLString },
        contributors: { type: new GraphQLList(UserType) },
        comments: { type: new GraphQLList(CommentType) }
    })
})