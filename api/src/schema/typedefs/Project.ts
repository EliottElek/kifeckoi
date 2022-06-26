import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { ClientType } from './Client'
import { EventType } from './Event'
import { EventsSchemaType } from './EventsSchema'
import { UserType } from './User'

export const ProjectType: any = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        client: { type: ClientType },
        globalStatus: { type: GraphQLString },
        planningStatus: { type: GraphQLString },
        perimeterStatus: { type: GraphQLString },
        globalDescription: { type: GraphQLString },
        planningDescription: { type: GraphQLString },
        perimeterDescription: { type: GraphQLString },
        goLiveDate: { type: GraphQLString },
        goCopyDate: { type: GraphQLString },
        logoUrl: { type: GraphQLString },
        clientId: { type: GraphQLString },
        events: { type: new GraphQLList(EventType) },
        contributors: { type: new GraphQLList(UserType) },
        creation: { type: GraphQLString },
        creator: { type: UserType },
        eventsSchema: { type: new GraphQLList(EventsSchemaType) }
    })
})