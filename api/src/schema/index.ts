import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS, GET_USER_BY_ID } from "./queries/User"
import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD, UPDATE_AVATAR, LOGIN } from "./mutations/User"
import { CREATE_CLIENT } from "./mutations/Client"
import { FIND_CLIENT_BY_ID, GET_ALL_CLIENTS } from './queries/Client'
import { CREATE_PROJECT, ADD_CONTRIBUTORS_TO_PROJECT, REMOVE_CONTRIBUTORS, MODIFY_PROJECT_GLOBAL_INFOS, MODIFY_PROJECT_NAME } from './mutations/Project'
import { FIND_PROJECT_BY_PROJECT_ID, FIND_PROJECTS_BY_CLIENT_ID, GET_ALL_PROJECTS } from "./queries/Project";
import { GET_ALL_EVENTS, GET_LATEST_EVENTS, FIND_EVENTS_BY_PROJECT_ID, GET_ALL_EVENTS_ALL_TYPES } from "./queries/Event";
import { CREATE_EVENT, CHANGE_EVENT_STATUS, CHANGE_EVENT_STATE, CHANGE_EVENT_DESCRIPTION, DELETE_EVENT, ADD_CONTRIBUTORS_TO_EVENT, DELETE_MULTIPLE_EVENTS } from "./mutations/Event";
import { GET_ALL_COMMENTS_BY_EVENT_ID } from "./queries/Comment";
import { CREATE_COMMENT, CHANGE_COMMENT__CONTENT, DELETE_COMMENT } from "./mutations/Comment";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS,
        findClientById: FIND_CLIENT_BY_ID,
        getAllClients: GET_ALL_CLIENTS,
        findProjectsByClientId: FIND_PROJECTS_BY_CLIENT_ID,
        findProjectByProjectId: FIND_PROJECT_BY_PROJECT_ID,
        getAllProjects: GET_ALL_PROJECTS,
        getAllEvents: GET_ALL_EVENTS,
        getAllEventsAllTypes: GET_ALL_EVENTS_ALL_TYPES,
        findEventsByProjectId: FIND_EVENTS_BY_PROJECT_ID,
        getLatestEvents: GET_LATEST_EVENTS,
        getAllCommentsByEventId: GET_ALL_COMMENTS_BY_EVENT_ID,
        getUserById: GET_USER_BY_ID,
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updatePassword: UPDATE_PASSWORD,
        updateAvatar: UPDATE_AVATAR,
        createClient: CREATE_CLIENT,
        createProject: CREATE_PROJECT,
        addContributorsToProject: ADD_CONTRIBUTORS_TO_PROJECT,
        removeContributors: REMOVE_CONTRIBUTORS,
        addContributorsToEvent: ADD_CONTRIBUTORS_TO_EVENT,
        createEvent: CREATE_EVENT,
        changeEventStatus: CHANGE_EVENT_STATUS,
        changeEventState: CHANGE_EVENT_STATE,
        changeEventDescription: CHANGE_EVENT_DESCRIPTION,
        deleteEvent: DELETE_EVENT,
        deleteMultipleEvents: DELETE_MULTIPLE_EVENTS,
        createComment: CREATE_COMMENT,
        changeCommentContent: CHANGE_COMMENT__CONTENT,
        deleteComment: DELETE_COMMENT,
        modifyProjectGlobalInfos: MODIFY_PROJECT_GLOBAL_INFOS,
        modifyProjectName: MODIFY_PROJECT_NAME,
        login: LOGIN,
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})
