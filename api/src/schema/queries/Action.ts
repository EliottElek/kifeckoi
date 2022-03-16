import { GraphQLList, GraphQLString } from "graphql"
import { ActionType } from "../typedefs/Action"
import { Project } from '../../entities/Project'
import { Action } from "../../entities/Action"

export const GET_ALL_ACTIONS = {
    type: new GraphQLList(ActionType),
    resolve() {
        return Action.find({ relations: ["project"] });
    }
}

export const FIND_ACTIONS_BY_PROJECT_ID = {
    type: new GraphQLList(ActionType),
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id } = args
        const project = await Project.findOne({ id: id }, { relations: ["actions"] })
        if (!project) throw new Error("Cannot find project.")
        return project.actions
    }
}
