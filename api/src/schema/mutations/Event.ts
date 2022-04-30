const { v4: uuid } = require("uuid");
import { GraphQLList, GraphQLString } from "graphql";
import { Project } from '../../entities/Project'
import { Event } from '../../entities/Event'
import { User } from '../../entities/User'
import { EventType } from '../typedefs/Event'
import { MessageType } from '../typedefs/Message'

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

    },
    async resolve(parent: any, args: any) {
        const { type, projectId, description, contributors, status, creatorId, period } = args
        const newuuid = uuid()
        const project = await Project.findOne({ id: projectId })
        const contributorsFound: User[] = []
        const creatorFound = await User.findOne({ id: creatorId })
        const creationDate = new Date();

        if (!project) {
            throw new Error("Cannot find project.")
        } else {
            const newEvent = Event.create({ type: type, id: newuuid, projectId: projectId, contributors: [], project: project, description: description, status: status, creation: creationDate.toString(), period: period })
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
export const CHANGE_EVENT_STATE = {
    type: MessageType,
    args: {
        eventId: { type: GraphQLString },
        newStatus: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { eventId, newStatus } = args
        const event = await Event.findOne({ id: eventId })
        if (!event) throw new Error("Cannot find event.")
        await Event.update({ id: eventId }, { status: newStatus })
        return { successful: true, message: "Event's state was successfully updated." }
    }
}
export const CHANGE_EVENT_DESCRIPTION = {
    type: MessageType,
    args: {
        eventId: { type: GraphQLString },
        newDescription: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
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
    async resolve(parent: any, args: any) {
        const { eventId } = args
        await Event.delete({ id: eventId })
        return { successful: true, message: "Event was successfully deleted." }
    }
}
export const ADD_CONTRIBUTORS_TO_EVENT = {
    type: EventType,
    args: {
        eventId: { type: GraphQLString },
        contributors: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
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