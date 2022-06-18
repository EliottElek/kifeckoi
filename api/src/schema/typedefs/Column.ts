import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { EventType } from './Event'

export const ColumnType: any = new GraphQLObjectType({
    name: "Column",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        tasks: { type: new GraphQLList(EventType) },
    })
})