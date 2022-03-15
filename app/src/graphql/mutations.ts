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