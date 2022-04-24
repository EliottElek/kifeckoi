"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const graphql_1 = require("graphql");
const Comment_1 = require("./Comment");
const Event_1 = require("./Event");
const Project_1 = require("./Project");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        firstname: { type: graphql_1.GraphQLString },
        lastname: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        avatarUrl: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        events: { type: new graphql_1.GraphQLList(Event_1.EventType) },
        comments: { type: new graphql_1.GraphQLList(Comment_1.CommentType) },
        createdEvents: { type: new graphql_1.GraphQLList(Event_1.EventType) },
        projects: { type: new graphql_1.GraphQLList(Project_1.ProjectType) }
    })
});
