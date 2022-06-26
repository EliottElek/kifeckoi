const { v4: uuid } = require("uuid");
import { GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { MessageType } from "../typedefs/Message";
import { EventsSchema } from "../../entities/EventsSchema";

export const CREATE_NEW_EVENTS_SCHEMA = {
    type: MessageType,
    args: {
        userId: { type: GraphQLString },
        title: { type: GraphQLString },
        projectId: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { title, projectId, userId } = args
        if (context.user.id !== userId) throw new Error("The user who made the request is not the same as the one in the context.");

        const newuuid = uuid()
        const project = await Project.findOne({ where: { id: projectId }, relations: ["eventsSchema"] })
        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            const newSchema = EventsSchema.create({ id: newuuid, title: title, eventsStatus: [], project: project, backgroundUrl: "" })
            await EventsSchema.save(newSchema)
            project.eventsSchema.push(newSchema)
            await Project.save(project)
        }
        return { message: `New type "${title}" was added to ${project.name}.` }
    }
}
export const UPDATE_EVENTS_SCHEMA_BG = {
    type: MessageType,
    args: {
        userId: { type: GraphQLString },
        schemaId: { type: GraphQLString },
        backgroundUrl: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { schemaId, userId, backgroundUrl } = args
        if (context.user.id !== userId) throw new Error("The user who made the request is not the same as the one in the context.");

        const schema = await EventsSchema.findOne({ where: { id: schemaId } })
        if (!schema) {
            throw new Error("Cannot find schema.")
        } else {
            schema.backgroundUrl = backgroundUrl;
            EventsSchema.save(schema)
        }
        return { message: `Background updated.` }
    }
}