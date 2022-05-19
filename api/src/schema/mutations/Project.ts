import { ProjectType } from "../typedefs/Project";
const { v4: uuid } = require("uuid");
import { GraphQLList, GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { Client } from '../../entities/Client'
import { User } from '../../entities/User'

export const CREATE_PROJECT = {
    type: ProjectType,
    args: {
        name: { type: GraphQLString },
        clientId: { type: GraphQLString },
        contributors: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { name, clientId, contributors } = args
        const client = await Client.findOne({ id: clientId })
        const newid = uuid();
        const contributorsFound: User[] = []
        if (!client) {
            throw new Error("Cannot find client.")
        } else {
            const user = User.findOne({ id: context.user.id })
            if (!user) throw new Error("Cannot find creator user.")
            const newProject = Project.create({
                name: name, id: newid, client: client, clientId: clientId, contributors: [], globalStatus: "", perimeterStatus: "", planningStatus: "", globalDescription: "", perimeterDescription: "", planningDescription: "", goCopyDate: "", goLiveDate: "", logoUrl: "", creation: new Date().toString()
            })
            contributors.map(async (contributor: any) => {
                const acc = await User.findOne({ id: contributor })
                if (acc) {
                    newProject.contributors.push(acc)
                    contributorsFound.push(acc)
                }
            })
            await Project.save(newProject)
            await Client.save(client)

        }
        return { ...args, client: client, id: newid }
    }
}
export const ADD_CONTRIBUTORS_TO_PROJECT = {
    type: ProjectType,
    args: {
        projectId: { type: GraphQLString },
        contributors: { type: new GraphQLList(GraphQLString) },

    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { projectId, contributors } = args
        const project = await Project.findOne({ id: projectId }, { relations: ["contributors"] })

        let contributorsFound: User[] = []

        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            const client = await Client.findOne({ id: project.clientId }, { relations: ["contributors"] })
            if (!client) throw new Error("Cannot find client.")
            project.contributors = [];
            contributors.map(async (contributor: any) => {
                const acc = await User.findOne({ id: contributor })
                if (acc) {
                    project.contributors.push(acc)

                    if (client.contributors.findIndex((c) => c.id !== acc.id)) {
                        client.contributors.push(acc)
                    }
                }
            })
            contributorsFound = project.contributors;
            Project.save(project)
            Client.save(client)
        }
        return { ...args }
    }
}
export const MODIFY_PROJECT_GLOBAL_INFOS = {
    type: ProjectType,
    args: {
        projectId: { type: GraphQLString },
        name: { type: GraphQLString },
        globalStatus: { type: GraphQLString },
        perimeterStatus: { type: GraphQLString },
        planningStatus: { type: GraphQLString },
        globalDescription: { type: GraphQLString },
        perimeterDescription: { type: GraphQLString },
        planningDescription: { type: GraphQLString },
        goLiveDate: { type: GraphQLString },
        goCopyDate: { type: GraphQLString },
        logoUrl: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { projectId, globalStatus, perimeterStatus, planningStatus, globalDescription, perimeterDescription, planningDescription, goLiveDate, goCopyDate, logoUrl } = args
        const project = await Project.findOne({ id: projectId })
        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            await Project.update({ id: projectId }, { globalStatus: globalStatus, perimeterStatus: perimeterStatus, planningStatus: planningStatus, globalDescription: globalDescription, perimeterDescription: perimeterDescription, planningDescription: planningDescription, goCopyDate: goCopyDate, goLiveDate: goLiveDate, logoUrl: logoUrl })
        }
        return { ...args }
    }
}
export const MODIFY_PROJECT_NAME = {
    type: ProjectType,
    args: {
        projectId: { type: GraphQLString },
        name: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { projectId, name } = args
        const project = await Project.findOne({ id: projectId })
        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            await Project.update({ id: projectId }, { name: name })
        }
        return { ...args }
    }
}