import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql'
import { CommentType } from './Comment'
import { EventType } from './Event'

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        avatarUrl: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString },
        events: { type: new GraphQLList(EventType) },
        comments: { type: new GraphQLList(CommentType) },
        createdEvents: { type: new GraphQLList(EventType) }

    })
})