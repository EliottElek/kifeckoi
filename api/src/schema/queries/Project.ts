import { GraphQLList, GraphQLString } from "graphql"
import { ProjectType } from "../typedefs/Project"
import { Project } from '../../entities/Project'
import { Client } from "../../entities/Client";

export const GET_ALL_PROJECTS = {
    type: new GraphQLList(ProjectType),
    resolve() {
        return Project.find({ relations: ["client", "actions", "infos", "decisions"] });
    }
}

export const FIND_PROJECT_BY_PROJECT_ID = {
    type: ProjectType,
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id } = args
        const project = await Project.findOne({ id: id }, { relations: ["client", "actions", "infos", "decisions"] })
        if (!project) throw new Error("Cannot find project.")
        return project
    }
}
export const FIND_PROJECTS_BY_CLIENT_ID = {
    type: new GraphQLList(ProjectType),
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id } = args
        const client = await Client.findOne({ id: id }, { relations: ["client", "actions", "infos", "decisons"] })
        return client?.projects;
    }
}