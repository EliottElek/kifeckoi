import { gql } from "@apollo/client"

export const CREATE_USER = gql`
mutation createUser($name: String! $username : String! $password : String!){
    createUser(name : $name username : $username password : $password){
        id
        name
        username
    }
}
`
export const CREATE_CLIENT = gql`
mutation createClient($name: String!){
    createClient(name : $name){
        id
        name
    }
}
`
export const CREATE_PROJECT = gql`
mutation createProject($name: String! $clientId: String!){
    createProject(name: $name clientId: $clientId){
        name
        id
    }
}
`
export const CREATE_ACTION = gql`
mutation createAction($name: String! $projectId: String! $description : String! $accountable : String! $status : String!){
    createAction(name: $name  projectId: $projectId description : $description accountable : $accountable status : $status){
        name
        id
        description
        status
        accountable
    }
}
`

export const CHANGE_ACTION_STATE = gql`
mutation changeActionState($actionId: String! $newStatus: String!){
    changeActionState(actionId: $actionId  newStatus: $newStatus){
        message
    }
}
`