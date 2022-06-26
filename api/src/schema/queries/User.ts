import { GraphQLList, GraphQLString } from "graphql"
import { UserType } from "../typedefs/User"
import { User } from '../../entities/User'
import { MessageType } from "../typedefs/Message";
export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        return User.find({ relations: ["events", "comments", "projects"] });
    }
}
export const GET_USER_BY_ID = {
    type: UserType || MessageType,
    args: {
        userId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { userId } = args
        const user = await User.findOne({ relations: ["events", "comments", "projects", "projects.contributors", "notifications", "notifications.emitter", "notificationsEmitted"], where: { id: userId } });
        if (!user) {
            return { successful: false, message: "Cannot find user." }
        }
        return user;
    }
}