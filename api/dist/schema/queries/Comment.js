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
exports.GET_ALL_COMMENTS_BY_EVENT_ID = void 0;
const graphql_1 = require("graphql");
const Comment_1 = require("../typedefs/Comment");
const Comment_2 = require("../../entities/Comment");
exports.GET_ALL_COMMENTS_BY_EVENT_ID = {
    args: {
        eventId: { type: graphql_1.GraphQLString }
    },
    type: new graphql_1.GraphQLList(Comment_1.CommentType),
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = args;
            const comments = yield Comment_2.Comment.find({ relations: ["author"], where: { eventId: eventId } });
            var sorted_comments = comments.sort((a, b) => {
                return new Date(a.creation).getTime() -
                    new Date(b.creation).getTime();
            });
            return sorted_comments;
        });
    }
};
