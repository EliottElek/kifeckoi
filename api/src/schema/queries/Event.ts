import { GraphQLList, GraphQLString } from "graphql"
import { EventType } from "../typedefs/Event"
import { Event } from "../../entities/Event"
import { User } from "../../entities/User"
import { ColumnType } from "../typedefs/Column"
import { Project } from "../../entities/Project"
export const GET_ALL_EVENTS = {
    type: new GraphQLList(EventType),
    args: {
        type: { type: GraphQLString },
        id: { type: GraphQLString },

    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { type } = args

        return await Event.find({
            where: { type: type }, relations: ["project", "comments", "creator", "contributors"],
        });
    }
}
export const GET_ALL_EVENTS_ALL_TYPES = {
    type: new GraphQLList(EventType),
    args: {
        id: { type: GraphQLString },

    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { id } = args

        return await Event.find({
            where: { projectId: id }, relations: ["project", "comments", "creator", "contributors"],
        });
    }
}
export const GET_LATEST_EVENTS = {
    type: new GraphQLList(EventType),
    args: {
        type: { type: GraphQLString },
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { id } = args
        const user = await User.findOne({ id: id })
        if (!user) throw new Error("Canot find user.")
        const events = await Event.find({ relations: ["creator", "project"] })
        const eventsOfUser = events.filter((event) => event?.creator?.id === user.id)
        var sorted_events = eventsOfUser.sort((a, b) => {
            return (
                new Date(a.creation).getTime() - new Date(b.creation).getTime()
            );
        });
        return sorted_events.splice(0, 10).reverse()
    }
}

export const FIND_EVENTS_BY_PROJECT_ID = {
    type: new GraphQLList(EventType),
    args: {
        type: { type: GraphQLString },
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { id, type } = args
        const events = await Event.find({
            where: { projectId: id, type: type }, relations: ["project", "comments", "comments.author", "creator", "contributors"],
        })
        if (!events) throw new Error("Cannot find project.")
        const sortedByIndex = events.sort((a, b) => a.index - b.index);
        return sortedByIndex
    }
}
export const FIND_EVENT_BY_EVENT_ID = {
    type: EventType,
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { id, } = args
        const event = await Event.findOne({
            where: { id: id }, relations: ["project", "comments", "comments.author", "creator", "contributors"],
        })
        if (!event) throw new Error("Cannot find event.")
        var sorted_comments = event.comments.sort((a, b) => {
            return new Date(a.creation).getTime() -
                new Date(b.creation).getTime()
        });
        event.comments = [...sorted_comments]
        return event
    }
}


export const GET_EVENTS_BY_STATUS = {
    type: new GraphQLList(ColumnType),
    args: {
        type: { type: GraphQLString },
        projectId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { type, projectId } = args

        const project = await Project.findOne({ where: { id: projectId }, relations: ["eventsSchema", "eventsSchema.eventsStatus"] })
        let eventsData = await Event.find({
            where: { type: type, projectId: projectId }, relations: ["project", "comments", "creator", "contributors"],
        });
        const typeSchema = project?.eventsSchema.find((e) => e.title === type)
        if (!typeSchema) throw new Error(`Cannot find schema "${type}".`)
        const rawEvents: typeof ColumnType = typeSchema?.eventsStatus.map((a) => {
            return { ...a, tasks: [] };
        })
        const eventsFinal = [...rawEvents];
        eventsData?.forEach((event) => {
            const index = eventsFinal.findIndex((ev) => ev.title === event.status);
            if (index !== -1) eventsFinal[index].tasks.push(event); else {
                eventsFinal.push({ title: event.status, id: eventsFinal.length.toString(), tasks: [event] })
            }
        });

        return eventsFinal ? eventsFinal : []
    }
}
