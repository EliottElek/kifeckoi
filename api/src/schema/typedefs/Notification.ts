import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql'
import { UserType } from './User'
import { ProjectType } from './Project'

export const NotificationType: any = new GraphQLObjectType({
    name: "Notification",
    fields: () => ({
        id: { type: GraphQLString },
        seen: { type: GraphQLBoolean },
        emitter: { type: UserType },
        receivers: { type: new GraphQLList(UserType) },
        content: { type: GraphQLString },
        redirect: { type: GraphQLString },
        message: { type: GraphQLString },
        creation: { type: GraphQLString },
        project: { type: ProjectType },
    })
})