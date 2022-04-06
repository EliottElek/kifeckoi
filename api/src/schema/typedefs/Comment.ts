import { GraphQLObjectType, GraphQLString } from 'graphql'
import { EventType } from './Event'
import { UserType } from './User'

export const CommentType: any = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: { type: GraphQLString },
        event: { type: EventType },
        eventId: { type: GraphQLString },
        author: { type: UserType },
        creation: { type: GraphQLString },
        content: { type: GraphQLString }
    })
})