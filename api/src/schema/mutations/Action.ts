const { v4: uuid } = require("uuid");
import { GraphQLList, GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { Action } from '../../entities/Action'
import { User } from '../../entities/User'
import { ActionType } from '../typedefs/Action'
import { MessageType } from '../typedefs/Message'

export const CREATE_ACTION = {
    type: ActionType,
    args: {
        name: { type: GraphQLString },
        projectId: { type: GraphQLString },
        description: { type: GraphQLString },
        accountables: { type: new GraphQLList(GraphQLString) },
        status: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { name, projectId, description, accountables, status } = args
        const newuuid = uuid()
        const project = await Project.findOne({ id: projectId })
        const accountablesFound: User[] = []
        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            const creationDate = new Date();
            const newAction = Action.create({ name: name, id: newuuid, projectId: projectId, accountables: [], project: project, description: description, status: status, creation: creationDate.toString() })
            await Action.save(newAction)
            accountables.map(async (accountable: any) => {
                const acc = await User.findOne({ id: accountable })
                if (acc) {
                    newAction.accountables.push(acc)
                    accountablesFound.push(acc)
                }
            })
            await Action.save(newAction)
            await Project.save(project)
        }
        return { ...args, id: newuuid, accountables: accountablesFound }
    }
}
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
export const CHANGE_ACTION_DESCRIPTION = {
    type: MessageType,
    args: {
        actionId: { type: GraphQLString },
        newDescription: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { actionId, newDescription } = args
        const action = await Action.findOne({ id: actionId })
        if (!action) throw new Error("Cannot find action.")
        await Action.update({ id: actionId }, { description: newDescription })
        return { successful: true, message: "Action's description was successfully updated." }
    }
}