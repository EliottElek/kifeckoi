import { GraphQLList, GraphQLString } from "graphql"
import { EventType } from "../typedefs/Event"
import { Event } from "../../entities/Event"

export const GET_ALL_EVENTS = {
    type: new GraphQLList(EventType),
    args: {
        type: { type: GraphQLString },
        id: { type: GraphQLString },

    },
    async resolve(parent: any, args: any) {
        const { type } = args

        return await Event.find({
            relations: ["project", "contributors", "comments", "creator"], where: { type: type }
        });
    }
}
export const GET_LATEST_EVENTS = {
    type: new GraphQLList(EventType),
    args: {
        type: { type: GraphQLString },
        id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, type } = args
        var events = await Event.find({
            relations: ["project", "contributors", "comments", "creator"], where: { type: type }
        });
        var sorted_events = events.sort((a, b) => {
            console.log(a.creation)
            console.log(b.creation)

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
    async resolve(parent: any, args: any) {
        const { id, type } = args
        const events = await Event.find({
            relations: ["contributors", "project", "comments", "creator"],
            where: { projectId: id, type: type }
        })
        if (!events) throw new Error("Cannot find project.")
        return events
    }
}
