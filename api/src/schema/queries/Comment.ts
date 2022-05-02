import { GraphQLList, GraphQLString } from "graphql"
import { CommentType } from "../typedefs/Comment"
import { Comment } from "../../entities/Comment"

export const GET_ALL_COMMENTS_BY_EVENT_ID = {
    args: {
        eventId: { type: GraphQLString }
    },
    type: new GraphQLList(CommentType),
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")
        const { eventId } = args;
        const comments = await Comment.find({ relations: ["author"], where: { eventId: eventId } });
        var sorted_comments = comments.sort((a, b) => {
            return new Date(a.creation).getTime() -
                new Date(b.creation).getTime()
        });
        return sorted_comments

    }
}