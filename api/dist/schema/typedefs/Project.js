"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectType = void 0;
const graphql_1 = require("graphql");
const Client_1 = require("./Client");
const Event_1 = require("./Event");
const User_1 = require("./User");
exports.ProjectType = new graphql_1.GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        client: { type: Client_1.ClientType },
        events: { type: new graphql_1.GraphQLList(Event_1.EventType) },
        contributors: { type: new graphql_1.GraphQLList(User_1.UserType) },
    })
});
