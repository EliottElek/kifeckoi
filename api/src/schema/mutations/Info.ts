const { v4: uuid } = require("uuid");
import { GraphQLString } from "graphql";
import { Info } from '../../entities/Info'
import { InfoType } from '../typedefs/Info'
import { MessageType } from '../typedefs/Message'
import { Project } from '../../entities/Project'

export const CREATE_INFO = {
    type: InfoType,
    args: {
        name: { type: GraphQLString },
        projectId: { type: GraphQLString },
        description: { type: GraphQLString },
        accountable: { type: GraphQLString },
        status: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { name, projectId, description, accountable, status } = args
        const newuuid = uuid()
        const project = await Project.findOne({ id: projectId })

        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            const newInfo = Info.create({ name: name, id: newuuid, project: project, accountable: accountable, description: description, status: status })
            await Info.save(newInfo)
            await Project.save(project)
        }
        return { ...args, id: newuuid }
    }
}
export const CHANGE_INFO_STATE = {
    type: MessageType,
    args: {
        infoId: { type: GraphQLString },
        newStatus: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { infoId, newStatus } = args
        const info = await Info.findOne({ id: infoId })
        if (!info) throw new Error("Cannot find info.")
        await Info.update({ id: infoId }, { status: newStatus })
        return { successful: true, message: "Info's state was successfully updated." }
    }
}