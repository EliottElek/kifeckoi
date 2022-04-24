"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_COMMENT = exports.CHANGE_COMMENT__CONTENT = exports.CREATE_COMMENT = void 0;
const { v4: uuid } = require("uuid");
const graphql_1 = require("graphql");
const Comment_1 = require("../../entities/Comment");
const Event_1 = require("../../entities/Event");
const User_1 = require("../../entities/User");
const Comment_2 = require("../typedefs/Comment");
exports.CREATE_COMMENT = {
    type: Comment_2.CommentType,
    args: {
        eventId: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        authorId: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId, content, authorId } = args;
            const newuuid = uuid();
            const event = yield Event_1.Event.findOne({ id: eventId });
            const author = yield User_1.User.findOne({ id: authorId }, { relations: ["comments"] });
            const creationDate = new Date();
            if (!event) {
                throw new Error("Cannot find event.");
            }
            else {
                if (!author) {
                    throw new Error("Cannot find author.");
                }
                const newComment = Comment_1.Comment.create({ id: newuuid, eventId: eventId, event: event, content: content, author: author, creation: creationDate.toString() });
                yield Comment_1.Comment.save(newComment);
                author.comments.push(newComment);
                yield User_1.User.save(author);
                yield Comment_1.Comment.save(newComment);
            }
            return Object.assign(Object.assign({}, args), { id: newuuid, author: author, creation: creationDate.toString() });
        });
    }
};
exports.CHANGE_COMMENT__CONTENT = {
    type: Comment_2.CommentType,
    args: {
        commentId: { type: graphql_1.GraphQLString },
        newContent: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId, newContent } = args;
            const comment = yield Comment_1.Comment.findOne({ id: commentId });
            if (!comment)
                throw new Error("Cannot find comment.");
            yield Comment_1.Comment.update({ id: commentId }, { content: newContent });
            return { successful: true, message: "Comment's content was successfully updated." };
        });
    }
};
exports.DELETE_COMMENT = {
    type: Comment_2.CommentType,
    args: {
        commentId: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId } = args;
            yield Comment_1.Comment.delete({ id: commentId });
            return { successful: true, message: "Comment was successfully deleted.", id: commentId };
        });
    }
};
