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
    async resolve(parent: any, args: any) {
        const { name, clientId, contributors } = args
        const client = await Client.findOne({ id: clientId })
        const newid = uuid();
        const contributorsFound: User[] = []

        if (!client) {
            throw new Error("Cannot find client.")
        } else {
            const newProject = Project.create({ name, id: newid, client: client, contributors: [] })
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
    async resolve(parent: any, args: any) {
        const { projectId, contributors } = args
        const project = await Project.findOne({ id: projectId }, { relations: ["contributors"] })
        let contributorsFound: User[] = []

        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            project.contributors = [];
            contributors.map(async (contributor: any) => {
                const acc = await User.findOne({ id: contributor })
                if (acc) {
                    project.contributors.push(acc)
                }
            })
            contributorsFound = project.contributors;
            Project.save(project)
        }
        return { ...args }
    }
}
