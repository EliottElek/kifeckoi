import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'

export const EventsStatusType: any = new GraphQLObjectType({
    name: "EventsStatus",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        index: { type: GraphQLInt }
    })
})