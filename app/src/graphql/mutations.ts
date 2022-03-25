import { gql } from "@apollo/client"

export const CREATE_USER = gql`
mutation createUser($firstname: String! $lastname : String! $email : String! $avatarUrl : String! $username : String! $password : String!){
    createUser(firstname : $firstname lastname : $lastname email : $email avatarUrl : $avatarUrl username : $username password : $password){
      id
      firstname
      lastname
      email
      avatarUrl
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
        client{
            id 
            name
        }
    }
}
`
export const CREATE_ACTION = gql`
mutation createAction($name: String! $projectId: String! $description : String! $accountables : [String!] $status : String!){
    createAction(name: $name  projectId: $projectId description : $description accountables : $accountables status : $status){
        name
        id
        description
        status
        creation
        accountables{
            id
            firstname
            lastname
            email
            avatarUrl
            username
        }
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
export const CHANGE_ACTION_DESCRIPTION = gql`
mutation changeActionDescription($actionId: String! $newDescription: String!){
    changeActionDescription(actionId: $actionId  newDescription: $newDescription){
        message
    }
}
`
