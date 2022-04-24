"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
const graphql_1 = require("graphql");
const Comment_1 = require("./Comment");
const Project_1 = require("./Project");
const User_1 = require("./User");
exports.EventType = new graphql_1.GraphQLObjectType({
    name: "Event",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        periodId: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        project: { type: Project_1.ProjectType },
        projectId: { type: graphql_1.GraphQLString },
        creation: { type: graphql_1.GraphQLString },
        creator: { type: User_1.UserType },
        targetDate: { type: graphql_1.GraphQLString },
        contributors: { type: new graphql_1.GraphQLList(User_1.UserType) },
        comments: { type: new graphql_1.GraphQLList(Comment_1.CommentType) }
    })
});
