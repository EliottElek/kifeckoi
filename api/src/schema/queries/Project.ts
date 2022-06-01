import { GraphQLList, GraphQLString } from "graphql"
import { ProjectType } from "../typedefs/Project"
import { Project } from '../../entities/Project'
import { User } from "../../entities/User";

export const GET_ALL_PROJECTS = {
    type: new GraphQLList(ProjectType),
    args: {
        userId: { type: GraphQLString }
    },
    async resolve(parents: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { userId } = args
        if (context.user.id !== userId) throw new Error("The user who made the request is not the same as the one in the context.");

        const user = await User.findOne({ where: { id: context.user.id }, relations: ["projects"] })
        if (!user) throw new Error("Cannot find user.")
        return user.projects
    }
}
export const FIND_PROJECT_BY_PROJECT_ID = {
    type: ProjectType,
    args: {
        userId: { type: GraphQLString },
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { id, userId } = args
        if (context.user.id !== userId) throw new Error("The user who made the request is not the same as the one in the context.");
        const project = await Project.findOne({ id: id }, { relations: ["client", "events", "contributors", "creator"] })
        if (!project) throw new Error("Cannot find project.")
        if (!project.contributors.find((contrib) => contrib.id === context.user.id)) { throw new Error("User does not have access to this project.") }
        return project
    }
}
export const FIND_PROJECTS_BY_CLIENT_ID = {
    type: new GraphQLList(ProjectType),
    args: {
        clientId: { type: GraphQLString },
        userId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { clientId, userId } = args
        if (context.user.id !== userId) throw new Error("The user who made the request is not the same as the one in the context.");

        const projectsToReturn: Project[] = []
        const projects = await Project.find({
            where: { clientId: clientId }, relations: ["contributors"],
        })
        projects.forEach((project) => {
            if (project.contributors.find((contrib) => contrib.id === context.user.id)) { projectsToReturn.push(project) }
        })
        return projectsToReturn;
    }
}