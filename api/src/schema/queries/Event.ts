import { GraphQLList, GraphQLString } from "graphql"
import { EventType } from "../typedefs/Event"
import { Event } from "../../entities/Event"

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
export const GET_LATEST_EVENTS = {
    type: new GraphQLList(EventType),
    args: {
        type: { type: GraphQLString },
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { id, type } = args
        var events = await Event.find({
            where: { projectId: id, type: type }, relations: ["project", "comments", "creator", "contributors"],
        });
        var sorted_events = events.sort((a, b) => {

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
