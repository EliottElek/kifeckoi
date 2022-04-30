import { GraphQLList, GraphQLString } from "graphql"
import { UserType } from "../typedefs/User"
import { User } from '../../entities/User'
import { MessageType } from "../typedefs/Message";
export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve() {
        return User.find({ relations: ["events", "comments", "projects"] });
    }
}
export const GET_USER_BY_ID = {
    type: UserType,
    args: {
        userId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { userId } = args
        return await User.findOne({ relations: ["events", "comments", "projects"], where: { id: userId } });
    }
}