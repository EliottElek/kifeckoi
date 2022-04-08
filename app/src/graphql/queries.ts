import { gql } from "@apollo/client"

export const GET_ALL_USERS = gql`
query{
    getAllUsers{
      id
      firstname
      lastname
      email
      avatarUrl
      username
    }
  }
`
export const GET_ALL_CLIENTS = gql`
query{
    getAllClients{
      name
      id
    }
  }
`

export const FIND_CLIENT_BY_ID = gql`
query findClientById($id: String!){
    findClientById(id : $id){
        id
        name
        projects {
          id
          name
        }
    }
}
`
export const FIND_PROJECT_BY_PROJECT_ID = gql`
query findProjectByProjectId($id: String!){
  findProjectByProjectId(id : $id){
        id
        name
        client {
          id 
          name
        }
    }
}
`
export const GET_ALL_PROJECTS = gql`
query{
    getAllProjects{
      name
      id
    }
  }
`
export const GET_ALL_EVENTS = gql`
query{
    getAllEvents{
    type
    id
    creation
    project{
      id
      name
    }
    description
    status
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
export const GET_LATEST_EVENTS = gql`
query getLatestEvents($id: String! $type : String!){
  getLatestEvents(id : $id type : $type){
    type
    id
    creation
    project{
      id
      name
    }
    creator {
      id
      firstname
      lastname
    }
    description
    status
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
export const FIND_EVENTS_BY_PROJECT_ID = gql`
query findEventsByProjectId($id: String! $type : String!){
  findEventsByProjectId(id : $id type : $type){
    type
    id
    description
    status
    creation
    creator {
      id
      firstname
      lastname
    }
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

export const GET_ALL_COMMENTS_BY_EVENT_ID = gql`
query getAllCommentsByEventId($eventId: String!){
  getAllCommentsByEventId(eventId : $eventId){
    id
    content
    creation
    author {
      id
      username
      avatarUrl
      firstname
      lastname
      email
    }
    }
  }
`