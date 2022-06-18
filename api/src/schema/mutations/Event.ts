const { v4: uuid } = require("uuid");
import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { Event } from '../../entities/Event'
import { User } from '../../entities/User'
import { EventType } from '../typedefs/Event'
import { MessageType } from '../typedefs/Message'
import sendMail from "../../utils/mail";

export const CREATE_EVENT = {
    type: EventType,
    args: {
        type: { type: GraphQLString },
        projectId: { type: GraphQLString },
        creatorId: { type: GraphQLString },
        description: { type: GraphQLString },
        contributors: { type: new GraphQLList(GraphQLString) },
        status: { type: GraphQLString },
        period: { type: GraphQLString },
        index: { type: GraphQLInt },

    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { type, projectId, description, contributors, status, creatorId, period, index } = args
        if (context.user.id !== creatorId) throw new Error("The user who made the request is not the same as the one in the context.");

        const newuuid = uuid()
        const project = await Project.findOne({ id: projectId })
        const contributorsFound: User[] = []
        const creatorFound = await User.findOne({ id: context.user.id })
        const creationDate = new Date();

        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            const newEvent = Event.create({ type: type, index: index, id: newuuid, projectId: projectId, contributors: [], project: project, description: description, status: status, creation: creationDate.toString(), period: period, state: "" })
            await Event.save(newEvent)
            if (!creatorFound) {
                throw new Error("Cannot find project.")
            } else {
                newEvent.creator = creatorFound
            }
            contributors.map(async (contributor: any) => {
                const acc = await User.findOne({ id: contributor })
                if (acc) {
                    newEvent.contributors.push(acc)
                    contributorsFound.push(acc)
                }
            })
            await Event.save(newEvent)
            await Project.save(project)
        }
        return { ...args, id: newuuid, contributors: contributorsFound, creator: creatorFound, creation: creationDate.toString(), period: period }
    }
}
export const CHANGE_EVENT_STATUS = {
    type: MessageType,
    args: {
        eventId: { type: GraphQLString },
        newStatus: { type: GraphQLString },
        index: { type: GraphQLInt }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        let { eventId, newStatus, index } = args
        const event = await Event.findOne({ id: eventId })
        if (!event) throw new Error("Cannot find event.")
        if (newStatus === "") newStatus = event.status
        await Event.update({ id: eventId }, { status: newStatus, index: index })
        return { successful: true, message: "Event's status was successfully updated." }
    }
}
export const CHANGE_EVENT_STATE = {
    type: MessageType,
    args: {
        eventId: { type: GraphQLString },
        newState: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { eventId, newState } = args
        const event = await Event.findOne({ id: eventId })
        if (!event) throw new Error("Cannot find event.")
        await Event.update({ id: eventId }, { state: newState })
        return { successful: true, message: "Event's state was successfully updated." }
    }
}
export const CHANGE_EVENT_DESCRIPTION = {
    type: MessageType,
    args: {
        eventId: { type: GraphQLString },
        newDescription: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { eventId, newDescription } = args
        const event = await Event.findOne({ id: eventId })
        if (!event) throw new Error("Cannot find event.")
        await Event.update({ id: eventId }, { description: newDescription })
        return { successful: true, message: "Event's description was successfully updated." }
    }
}
export const DELETE_EVENT = {
    type: MessageType,
    args: {
        eventId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { eventId } = args
        await Event.delete({ id: eventId })
        return { successful: true, message: "Event was successfully deleted." }
    }
}
export const DELETE_MULTIPLE_EVENTS = {
    type: MessageType,
    args: {
        eventIds: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { eventIds } = args
        await Event.delete(eventIds)
        return { successful: true, message: "Events were successfully deleted." }
    }
}
export const ADD_CONTRIBUTORS_TO_EVENT = {
    type: EventType,
    args: {
        eventId: { type: GraphQLString },
        contributors: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { eventId, contributors } = args
        const event = await Event.findOne({ id: eventId }, { relations: ["contributors"] })
        var contributorsFound: User[] = []
        if (!event) {
            throw new Error("Cannot find event.")
        } else {
            event.contributors = [];
            contributors.map(async (contributor: any) => {
                const acc = await User.findOne({ id: contributor })
                if (acc) {
                    event.contributors.push(acc)
                }
            })
            contributorsFound = event.contributors;
            Event.save(event)
        }
        return { ...args, contributorsFound }
    }
}
export const MENTION_USERS_IN_EVENTS = {
    type: MessageType,
    args: {
        eventId: { type: GraphQLString },
        userIds: { type: new GraphQLList(GraphQLString) },
        mentionContext: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { eventId, userIds, mentionContext } = args
        const event = await Event.findOne({ id: eventId })
        if (!event) {
            throw new Error("Cannot find event.")
        } else {
            const project = await Project.findOne({ id: event.projectId })
            if (!project) {
                throw new Error("Cannot find project.")
            }
            userIds.map(async (contributor: any) => {
                const usr = await User.findOne({ id: contributor })
                if (usr) {
                    sendMail(context.user, project, usr, 'event-mention', `${context.user.firstname} vous a mentionné(e) dans ${project.name}.`, mentionContext).catch(console.error);
                }
            })
        }
        return { successfull: true, message: "All mentionned users have been alerted." }
    }
}

export const CAPTURE_EVENTS_POSITIONS = {
    type: MessageType,
    args: {
        events: { type: new GraphQLList(GraphQLString) },
        indexes: { type: new GraphQLList(GraphQLInt) }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { events, indexes } = args
        events.forEach(async (e: any, i: string | number) => {
            let event = await Event.findOne({ id: e });
            if (event) {
                event.index = indexes[i]
            }
        })
        Event.save(events)

        return { message: "Event indexes are updated." }
    }
}