import { GraphQLInt, GraphQLList, GraphQLString } from "graphql"
import { CommentType } from "../typedefs/Comment"
import { Comment } from "../../entities/Comment"
import { MessageType } from "../typedefs/Message";

export const GET_ALL_COMMENTS_BY_EVENT_ID = {
    args: {
        eventId: { type: GraphQLString }
    },
    type: new GraphQLList(CommentType),
    async resolve(parent: any, args: any) {
        const { eventId } = args;
        return await Comment.find({ relations: ["author"], where: { eventId: eventId } });
    }
}
export const GET_NUMBER_OF_COMMENTS = {
    type: MessageType,
    args: {
        eventId: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { eventId } = args;
        const comments = await Comment.find({ where: { eventId: eventId } });
        const length = comments.length
        console.log(comments)
        return { message : length }
    }
}