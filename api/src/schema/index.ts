import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./queries/User"
import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD, UPDATE_AVATAR } from "./mutations/User"
import { CREATE_CLIENT } from "./mutations/Client"
import { FIND_CLIENT_BY_ID, GET_ALL_CLIENTS } from './queries/Client'
import { CREATE_PROJECT } from './mutations/Project'
import { FIND_PROJECT_BY_PROJECT_ID, FIND_PROJECTS_BY_CLIENT_ID, GET_ALL_PROJECTS } from "./queries/Project";
import { GET_ALL_ACTIONS, FIND_ACTIONS_BY_PROJECT_ID } from "./queries/Action";
import { CREATE_ACTION, CHANGE_ACTION_STATE } from "./mutations/Action";
import { GET_ALL_INFOS, FIND_INFOS_BY_PROJECT_ID } from "./queries/Info";
import { CREATE_INFO, CHANGE_INFO_STATE } from "./mutations/Info";
import { GET_ALL_DECISIONS, FIND_DECISIONS_BY_PROJECT_ID } from "./queries/Decision";
import { CREATE_DECISION, CHANGE_DECISION_STATE } from "./mutations/Decision";
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS,
        findClientById: FIND_CLIENT_BY_ID,
        getAllClients: GET_ALL_CLIENTS,
        findProjectsByClientId: FIND_PROJECTS_BY_CLIENT_ID,
        findProjectByProjectId: FIND_PROJECT_BY_PROJECT_ID,
        getAllProjects: GET_ALL_PROJECTS,
        getAllActions: GET_ALL_ACTIONS,
        findActionsByProjectId: FIND_ACTIONS_BY_PROJECT_ID,
        getAllInfos: GET_ALL_INFOS,
        findInfosByProjectId: FIND_INFOS_BY_PROJECT_ID,
        getAllDecisions: GET_ALL_DECISIONS,
        findDecisionsByProjectId: FIND_DECISIONS_BY_PROJECT_ID
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
        createAction: CREATE_ACTION,
        changeActionState: CHANGE_ACTION_STATE,
        createInfo: CREATE_INFO,
        changeInfoState: CHANGE_INFO_STATE,
        createDecision: CREATE_DECISION,
        changeDecisionState: CHANGE_DECISION_STATE
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})