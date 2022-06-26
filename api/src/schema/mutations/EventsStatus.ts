const { v4: uuid } = require("uuid");
import { GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { MessageType } from "../typedefs/Message";
import { EventsSchema } from "../../entities/EventsSchema";
import { EventsStatus } from "../../entities/EventsStatus";
import { Event } from "../../entities/Event";

export const CREATE_NEW_EVENTS_STATUS = {
    type: MessageType,
    args: {
        userId: { type: GraphQLString },
        title: { type: GraphQLString },
        projectId: { type: GraphQLString },
        schemaId: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { title, projectId, userId, schemaId } = args
        if (context.user.id !== userId) throw new Error("The user who made the request is not the same as the one in the context.");

        const newuuid = uuid()
        const project = await Project.findOne({ where: { id: projectId }, relations: ["eventsSchema"] })
        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            const eventsSchema = await EventsSchema.findOne({ where: { id: schemaId }, relations: ["eventsStatus"] })
            if (!eventsSchema) throw new Error("Cannot find schema.")
            const newStatus = EventsStatus.create({ id: newuuid, title: title, index: eventsSchema.eventsStatus.length })
            eventsSchema.eventsStatus.push(newStatus)
            await EventsStatus.save(newStatus)
            await EventsSchema.save(eventsSchema)
        }
        return { message: `New column "${title}" was added to ${schemaId}.` }
    }
}
export const DELETE_EVENTS_STATUS = {
    type: MessageType,
    args: {
        id: { type: GraphQLString },
        type: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { id, type } = args
        const eventsStatus = await EventsStatus.findOne({ id: id });
        if (!eventsStatus) throw new Error("Cannot find event status.")
        await EventsStatus.delete({ id: id })
        await Event.delete({ status: eventsStatus.title, type: type })
        return { message: `EventsStatus and all its events were deleted.` }
    }
}
export const RENAME_EVENTS_STATUS = {
    type: MessageType,
    args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        type: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { id, title, type } = args
        const eventsStatus = await EventsStatus.findOne({ id: id })
        if (!eventsStatus) throw new Error("Cannot find events status.")
        const oldTitle = eventsStatus.title

        await EventsStatus.update({ id: id }, { title: title });
        await Event.update({ status: oldTitle, type: type }, { status: title })
        return { message: `EventsStatus and all its events were updated.` }
    }
}
