"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentType = void 0;
const graphql_1 = require("graphql");
const Event_1 = require("./Event");
const User_1 = require("./User");
exports.CommentType = new graphql_1.GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        event: { type: Event_1.EventType },
        eventId: { type: graphql_1.GraphQLString },
        author: { type: User_1.UserType },
        creation: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString }
    })
});
