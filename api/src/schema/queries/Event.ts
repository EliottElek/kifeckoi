import { GraphQLList, GraphQLString } from "graphql"
import { EventType } from "../typedefs/Event"
import { Event } from "../../entities/Event"
import { User } from "../../entities/User"
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
        const user = await User.findOne({ id: id }, { relations: ["projects"] })
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
            where: { projectId: id, type: type }, relations: ["project", "comments", "creator", "contributors"],
        })
        if (!events) throw new Error("Cannot find project.")
        return events
    }
}
