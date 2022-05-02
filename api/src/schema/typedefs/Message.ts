import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'

export const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        successful: { type: GraphQLBoolean },
        name: { type: GraphQLString },
        message: { type: GraphQLString },
        token: { type: GraphQLString }
    })
})