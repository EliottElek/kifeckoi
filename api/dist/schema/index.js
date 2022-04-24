"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const User_1 = require("./queries/User");
const User_2 = require("./mutations/User");
const Client_1 = require("./mutations/Client");
const Client_2 = require("./queries/Client");
const Project_1 = require("./mutations/Project");
const Project_2 = require("./queries/Project");
const Event_1 = require("./queries/Event");
const Event_2 = require("./mutations/Event");
const Comment_1 = require("./queries/Comment");
const Comment_2 = require("./mutations/Comment");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: User_1.GET_ALL_USERS,
        findClientById: Client_2.FIND_CLIENT_BY_ID,
        getAllClients: Client_2.GET_ALL_CLIENTS,
        findProjectsByClientId: Project_2.FIND_PROJECTS_BY_CLIENT_ID,
        findProjectByProjectId: Project_2.FIND_PROJECT_BY_PROJECT_ID,
        getAllProjects: Project_2.GET_ALL_PROJECTS,
        getAllEvents: Event_1.GET_ALL_EVENTS,
        findEventsByProjectId: Event_1.FIND_EVENTS_BY_PROJECT_ID,
        getLatestEvents: Event_1.GET_LATEST_EVENTS,
        getAllCommentsByEventId: Comment_1.GET_ALL_COMMENTS_BY_EVENT_ID,
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: User_2.CREATE_USER,
        deleteUser: User_2.DELETE_USER,
        updatePassword: User_2.UPDATE_PASSWORD,
        updateAvatar: User_2.UPDATE_AVATAR,
        createClient: Client_1.CREATE_CLIENT,
        createProject: Project_1.CREATE_PROJECT,
        addContributorsToProject: Project_1.ADD_CONTRIBUTORS_TO_PROJECT,
        addContributorsToEvent: Event_2.ADD_CONTRIBUTORS_TO_EVENT,
        createEvent: Event_2.CREATE_EVENT,
        changeEventState: Event_2.CHANGE_EVENT_STATE,
        changeEventDescription: Event_2.CHANGE_EVENT_DESCRIPTION,
        deleteEvent: Event_2.DELETE_EVENT,
        createComment: Comment_2.CREATE_COMMENT,
        changeCommentContent: Comment_2.CHANGE_COMMENT__CONTENT,
        deleteComment: Comment_2.DELETE_COMMENT
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
