import { GraphQLString } from "graphql"
import { NotificationType } from "../typedefs/Notification"
import { User } from "../../entities/User"


export const GET_NOTIFICATIONS_BY_USER_ID = {
    type: NotificationType,
    args: {
        userId: { type: GraphQLString },
    },
    async subscribe(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { userId } = args
        const user = await User.findOne({ where: { id: userId }, relations: ["notifications"] })
        if (!user) throw new Error("Cannot find user.")
        return await context.pubsub.asyncIterator(userId)
    },
    resolve: async (payload: any, context: any) => {
        const { userId } = context
        const user = await User.findOne({ where: { id: userId }, relations: ["notifications"] })
        if (!user) throw new Error("Cannot find user")
        return payload.notification
    },
}
