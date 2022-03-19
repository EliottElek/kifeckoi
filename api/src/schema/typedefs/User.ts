import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql'
import { ActionType } from './Action'

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
        actions: { type: new GraphQLList(ActionType) }
    })
})