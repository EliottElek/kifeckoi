import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./queries/User"
import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD } from "./mutations/User"
import { CREATE_CLIENT } from "./mutations/Client"
import { FIND_CLIENT_BY_ID, GET_ALL_CLIENTS } from './queries/Client'
import { CREATE_PROJECT } from './mutations/Project'
import { FIND_PROJECT_BY_PROJECT_ID, FIND_PROJECTS_BY_CLIENT_ID, GET_ALL_PROJECTS } from "./queries/Project";
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS,
        findClientById: FIND_CLIENT_BY_ID,
        getAllClients: GET_ALL_CLIENTS,
        findProjectsByClientId: FIND_PROJECTS_BY_CLIENT_ID,
        findProjectByProjectId: FIND_PROJECT_BY_PROJECT_ID,
        getAllProjects: GET_ALL_PROJECTS
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updatePassword: UPDATE_PASSWORD,
        createClient: CREATE_CLIENT,
        createProject: CREATE_PROJECT
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})