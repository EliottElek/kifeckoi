import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS, GET_USER_BY_ID } from "./queries/User"
import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD, UPDATE_AVATAR, LOGIN } from "./mutations/User"
import { CREATE_CLIENT } from "./mutations/Client"
import { FIND_CLIENT_BY_ID, GET_ALL_CLIENTS } from './queries/Client'
import { CREATE_PROJECT, ADD_CONTRIBUTORS_TO_PROJECT, REMOVE_CONTRIBUTORS, MODIFY_PROJECT_GLOBAL_INFOS, MODIFY_PROJECT_NAME } from './mutations/Project'
import { FIND_PROJECT_BY_PROJECT_ID, FIND_PROJECTS_BY_CLIENT_ID, GET_ALL_PROJECTS, GET_EVENTS_TYPES_COUNT } from "./queries/Project";
import { GET_ALL_EVENTS, GET_LATEST_EVENTS, FIND_EVENTS_BY_PROJECT_ID, GET_ALL_EVENTS_ALL_TYPES, FIND_EVENT_BY_EVENT_ID, GET_EVENTS_BY_STATUS } from "./queries/Event";
import { CREATE_EVENT, CHANGE_EVENT_STATUS, CHANGE_EVENT_STATE, CHANGE_EVENT_DESCRIPTION, DELETE_EVENT, ADD_CONTRIBUTORS_TO_EVENT, DELETE_MULTIPLE_EVENTS, MENTION_USERS_IN_EVENTS, CAPTURE_EVENTS_POSITIONS } from "./mutations/Event";
import { GET_ALL_COMMENTS_BY_EVENT_ID } from "./queries/Comment";
import { CREATE_COMMENT, CHANGE_COMMENT__CONTENT, DELETE_COMMENT } from "./mutations/Comment";
import { GET_NOTIFICATIONS_BY_USER_ID } from "./subscriptions/Notification";
import { CREATE_NOTIFICATION, READ_NOTIFICATION } from "./mutations/Notification";
import { RETURN_NOTIFICATIONS_BY_USER_ID } from "./queries/Notification";
import { CREATE_NEW_EVENTS_SCHEMA, UPDATE_EVENTS_SCHEMA_BG } from "./mutations/EventsSchema";
import { CREATE_NEW_EVENTS_STATUS, DELETE_EVENTS_STATUS, RENAME_EVENTS_STATUS } from "./mutations/EventsStatus";

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
        returnNotificationsByUserId: RETURN_NOTIFICATIONS_BY_USER_ID,
        findEventByEventId: FIND_EVENT_BY_EVENT_ID,
        getEventsByStatus: GET_EVENTS_BY_STATUS,
        getEventsTypesCount: GET_EVENTS_TYPES_COUNT
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
        mentionUsersInEvents: MENTION_USERS_IN_EVENTS,
        createNotification: CREATE_NOTIFICATION,
        readNotification: READ_NOTIFICATION,
        captureEventsPositions: CAPTURE_EVENTS_POSITIONS,
        createNewEventsSchema: CREATE_NEW_EVENTS_SCHEMA,
        createNewEventsStatus: CREATE_NEW_EVENTS_STATUS,
        updateEventsSchemaBg: UPDATE_EVENTS_SCHEMA_BG,
        deleteEventsStatus: DELETE_EVENTS_STATUS,
        renameEventsStatus: RENAME_EVENTS_STATUS
    }
})
const Subscription = new GraphQLObjectType({
    name: "Subscription",
    fields: {
        getNotificationsByUserId: GET_NOTIFICATIONS_BY_USER_ID
    }
})
export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    subscription: Subscription
})
