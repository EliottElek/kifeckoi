import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { EventsStatusType } from './EventsStatus'
import { ProjectType } from './Project'

export const EventsSchemaType: any = new GraphQLObjectType({
    name: "EventsSchema",
    fields: () => ({
        title: { type: GraphQLString },
        id: { type: GraphQLString },
        eventsStatus: { type: new GraphQLList(EventsStatusType) },
        project: { type: ProjectType },
        backgroundUrl: { type: GraphQLString }
    })
})