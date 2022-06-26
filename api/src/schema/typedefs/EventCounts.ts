import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'

export const EventCountType: any = new GraphQLObjectType({
    name: "EventCount",
    fields: () => ({
        title: { type: GraphQLString },
        count: { type: GraphQLInt },
        backgroundUrl: { type: GraphQLString }
    })
})