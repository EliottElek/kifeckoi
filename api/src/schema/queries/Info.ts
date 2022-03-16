import { GraphQLList, GraphQLString } from "graphql"
import { InfoType } from "../typedefs/Info"
import { Project } from '../../entities/Project'
import { Info } from "../../entities/Info"

export const GET_ALL_INFOS = {
    type: new GraphQLList(InfoType),
    resolve() {
        return Info.find({ relations: ["project"] });
    }
}

export const FIND_INFOS_BY_PROJECT_ID = {
    type: new GraphQLList(InfoType),
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id } = args
        const project = await Project.findOne({ id: id }, { relations: ["infos"] })
        if (!project) throw new Error("Cannot find project.")
        return project.infos
    }
}
