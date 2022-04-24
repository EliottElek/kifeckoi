"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientType = void 0;
const graphql_1 = require("graphql");
const Project_1 = require("./Project");
exports.ClientType = new graphql_1.GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        projects: { type: new graphql_1.GraphQLList(Project_1.ProjectType) }
    })
});
