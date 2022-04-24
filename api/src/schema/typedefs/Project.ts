import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { ClientType } from './Client'
import { EventType } from './Event'
import { UserType } from './User'

export const ProjectType: any = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        client: { type: ClientType },
        events: { type: new GraphQLList(EventType) },
        contributors: { type: new GraphQLList(UserType) },
    })
})