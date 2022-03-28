import { ProjectType } from "../typedefs/Project";
const { v4: uuid } = require("uuid");
import { GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { Client } from '../../entities/Client'

export const CREATE_PROJECT = {
    type: ProjectType,
    args: {
        name: { type: GraphQLString },
        clientId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { name, clientId } = args
        const client = await Client.findOne({ id: clientId })
        const newid = uuid();

        if (!client) {
            throw new Error("Cannot find client.")
        } else {
            const newProject = Project.create({ name, id: newid, client: client })
            await Project.save(newProject)
            await Client.save(client)

        }
        return { ...args, client: client, id: newid }
    }
}