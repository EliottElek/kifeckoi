const { v4: uuid } = require("uuid");
import { GraphQLString } from "graphql";
import { Comment } from "../../entities/Comment";
import { Event } from "../../entities/Event";
import { User } from "../../entities/User";
import { CommentType } from "../typedefs/Comment";
export const CREATE_COMMENT = {
    type: CommentType,
    args: {
        eventId: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { eventId, content, authorId } = args
        if (context.user.id !== authorId) throw new Error("The user who made the request is not the same as the one in the context.");

        const newuuid = uuid()
        const event = await Event.findOne({ id: eventId })
        const author = await User.findOne({ id: authorId }, { relations: ["comments"] })
        const creationDate = new Date();

        if (!event) {
            throw new Error("Cannot find event.")
        } else {
            if (!author) {
                throw new Error("Cannot find author.")
            }
            const newComment = Comment.create({ id: newuuid, eventId: eventId, event: event, content: content, author: author, creation: creationDate.toString() })
            await Comment.save(newComment)
            author.comments.push(newComment);

            await User.save(author)
            await Comment.save(newComment)
        }
        return { ...args, id: newuuid, author: author, creation: creationDate.toString() }
    }
}
export const CHANGE_COMMENT__CONTENT = {
    type: CommentType,
    args: {
        commentId: { type: GraphQLString },
        newContent: { type: GraphQLString }
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { commentId, newContent } = args
        const comment = await Comment.findOne({ id: commentId }, { relations: ["author"] })
        if (!comment) throw new Error("Cannot find comment.")
        if (context.user.id !== comment.author.id) throw new Error("You cannot update a comment you did not create.")

        await Comment.update({ id: commentId }, { content: newContent })
        return { successful: true, message: "Comment's content was successfully updated." }
    }
}
export const DELETE_COMMENT = {
    type: CommentType,
    args: {
        commentId: { type: GraphQLString },
    },
    async resolve(parent: any, args: any, context: any) {
        if (!context.user) throw new Error("You must be authenticated.")

        const { commentId } = args
        const comment = await Comment.findOne({ id: commentId }, { relations: ["author"] });
        if (!comment) throw new Error("Cannot find comment.")
        if (context.user.id !== comment.author.id) throw new Error("You cannot delete a comment you did not create.")

        await Comment.delete({ id: commentId })
        return { successful: true, message: "Comment was successfully deleted.", id: commentId }
    }
}