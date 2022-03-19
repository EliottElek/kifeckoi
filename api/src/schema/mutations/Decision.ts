const { v4: uuid } = require("uuid");
import { GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { Decision } from '../../entities/Decision'
import { DecisionType } from '../typedefs/Decision'
import { MessageType } from '../typedefs/Message'

export const CREATE_DECISION = {
    type: DecisionType,
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
            const newDecision = Decision.create({ name: name, id: newuuid, project: project, accountable: accountable, description: description, status: status })
            await Decision.save(newDecision)
            await Project.save(project)
        }
        return { ...args, id: newuuid }
    }
}
export const CHANGE_DECISION_STATE = {
    type: MessageType,
    args: {
        decisionId: { type: GraphQLString },
        newStatus: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { decisionId, newStatus } = args
        const decision = await Decision.findOne({ id: decisionId })
        if (!decision) throw new Error("Cannot find decision.")
        await Decision.update({ id: decisionId }, { status: newStatus })
        return { successful: true, message: "Decision's state was successfully updated." }
    }
}