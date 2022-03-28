import { GraphQLList, GraphQLString } from "graphql"
import { ActionType } from "../typedefs/Action"
import { Action } from "../../entities/Action"

export const GET_ALL_ACTIONS = {
    type: new GraphQLList(ActionType),
    resolve() {
        return Action.find({ relations: ["project", "accountables"] });
    }
}
export const GET_LATEST_ACTIONS = {
    type: new GraphQLList(ActionType),
    async resolve() {
        var actions = await Action.find({ relations: ["project", "accountables"] });
        var sorted_messages = actions.sort((a, b) => {
            return (
                new Date(a.creation).getTime() - new Date(b.creation).getTime()
            );
        });
        return sorted_messages.splice(0, 10).reverse()
    }
}

export const FIND_ACTIONS_BY_PROJECT_ID = {
    type: new GraphQLList(ActionType),
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id } = args
        const actions = await Action.find({
            relations: ["accountables", "project"],
            where: { projectId: id }
        })
        if (!actions) throw new Error("Cannot find project.")
        return actions
    }
}