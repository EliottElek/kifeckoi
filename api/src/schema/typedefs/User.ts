import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'
import { CommentType } from './Comment'
import { EventType } from './Event'
import { NotificationType } from './Notification'
import { ProjectType } from './Project'

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        avatarUrl: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString },
        events: { type: new GraphQLList(EventType) },
        comments: { type: new GraphQLList(CommentType) },
        createdEvents: { type: new GraphQLList(EventType) },
        projects: { type: new GraphQLList(ProjectType) },
        notifications: { type: new GraphQLList(NotificationType) },
        notificationsEmitted: { type: new GraphQLList(NotificationType) }

    })
})