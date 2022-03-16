const { v4: uuid } = require("uuid");
import { GraphQLList, GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { Action } from '../../entities/Action'
import { ActionType } from '../typedefs/Action'
import { MessageType } from '../typedefs/Message'

export const CREATE_ACTION = {
    type: ActionType,
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
            const newAction = Action.create({ name: name, id: newuuid, project: project, accountable: accountable, description: description, status: status })
            await Action.save(newAction)
            await Project.save(project)
        }
        return { ...args, id: newuuid }
    }
}
// export const UPDATE_ACTIONS = {
//     type: MessageType,
//     args: {
//         projectId: { type: GraphQLString },
//         newActions: { type: new GraphQLList(ActionType) }
//     },
//     async resolve(parent: any, args: any) {
//         const { projectId, newActions } = args
//         const project = await Project.findOne({ id: projectId })
//         if (!project) throw new Error("Cannot find project.")
//         await Project.update({ id: projectId }, { actions: newActions })
//         return { successful: true, message: "Actions were successfully updated." }
//     }
// }
export const CHANGE_ACTION_STATE = {
    type: MessageType,
    args: {
        actionId: { type: GraphQLString },
        newStatus: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { actionId, newStatus } = args
        const action = await Action.findOne({ id: actionId })
        if (!action) throw new Error("Cannot find action.")
        await Action.update({ id: actionId }, { status: newStatus })
        return { successful: true, message: "Action's state was successfully updated." }
    }
}