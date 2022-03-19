import { GraphQLList, GraphQLString } from "graphql"
import { DecisionType } from "../typedefs/Decision"
import { Project } from '../../entities/Project'
import { Decision } from "../../entities/Decision"

export const GET_ALL_DECISIONS = {
    type: new GraphQLList(DecisionType),
    resolve() {
        return Decision.find({ relations: ["project"] });
    }
}

export const FIND_DECISIONS_BY_PROJECT_ID = {
    type: new GraphQLList(DecisionType),
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id } = args
        const project = await Project.findOne({ id: id }, { relations: ["decisions"] })
        if (!project) throw new Error("Cannot find project.")
        return project.decisions
    }
}
