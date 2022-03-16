import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { ClientType } from './Client'
import { ActionType } from './Action'
import { InfoType } from './Info'
export const ProjectType: any = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        client: { type: ClientType },
        actions: { type: new GraphQLList(ActionType) },
        infos: { type: new GraphQLList(InfoType) }
    })
})