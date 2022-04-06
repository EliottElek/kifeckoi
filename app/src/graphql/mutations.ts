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
export const CREATE_EVENT = gql`
mutation createEvent($type: String! $projectId: String! $description : String! $contributors : [String!] $status : String!){
    createEvent(type: $type  projectId: $projectId description : $description contributors : $contributors status : $status){
        type
        id
        description
        status
        creation
        contributors{
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

export const CHANGE_EVENT_STATE = gql`
mutation changeEventState($eventId: String! $newStatus: String!){
    changeEventState(eventId: $eventId  newStatus: $newStatus){
        message
    }
}
`
export const CHANGE_EVENT_DESCRIPTION = gql`
mutation changeEventDescription($eventId: String! $newDescription: String!){
    changeEventDescription(eventId: $eventId  newDescription: $newDescription){
        message
    }
}
`
export const DELETE_EVENT = gql`
mutation deleteEvent($eventId: String!){
    deleteEvent(eventId: $eventId){
        message
    }
}
`
export const CREATE_COMMENT = gql`
mutation createComment($eventId: String! $authorId : String! $content : String!){
    createComment(eventId: $eventId authorId: $authorId content: $content){
        id
        content
        creation
        author{
          id
          email
          firstname
          lastname
          avatarUrl
        }
    }
}`
