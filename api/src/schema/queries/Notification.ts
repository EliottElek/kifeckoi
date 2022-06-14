import { GraphQLList, GraphQLString } from "graphql"
import { NotificationType } from "../typedefs/Notification"
import { User } from "../../entities/User"

export const RETURN_NOTIFICATIONS_BY_USER_ID = {
    type: new GraphQLList(NotificationType),
    args: {
        userId: { type: GraphQLString },
        projectId: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { userId } = args
        const user = await User.findOne({ where: { id: userId }, relations: ["notifications", 'notifications.emitter'] })
        if (!user) throw new Error("Cannot find user.")
        return user.notifications
    }
}