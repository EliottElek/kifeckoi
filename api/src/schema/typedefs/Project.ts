import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { ClientType } from './Client'
import { ActionType } from './Action'
export const ProjectType: any = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        client: { type: ClientType },
        actions: { type: new GraphQLList(ActionType) }
    })
})