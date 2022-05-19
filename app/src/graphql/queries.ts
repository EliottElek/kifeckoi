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

export const GET_USER_BY_ID = gql`
query getUserById($userId: String!){
  getUserById(userId : $userId){
      id
      firstname
      lastname
      email
      avatarUrl
      username
      maxCaractersCard
      projects{
        id
        name
      }
    } 
  }
`
export const GET_ALL_CLIENTS = gql`
query getAllClients($userId : String!){
    getAllClients(userId : $userId){
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
          logoUrl
        }
    }
}
`
export const FIND_PROJECT_BY_PROJECT_ID = gql`
query findProjectByProjectId($id: String! $userId : String!){
  findProjectByProjectId(id : $id userId : $userId){
        id
        name
        globalStatus
        planningStatus
        perimeterStatus
        globalDescription
        planningDescription
        perimeterDescription
        goLiveDate
        goCopyDate
        logoUrl
        client {
          id 
          name
        }
        contributors{
          id
          username
          avatarUrl
          email
          firstname
          lastname
        }
        events{
          id
          type
          description
          contributors{
            id
          }
        }
    }
}
`
export const FIND_PROJECTS_BY_CLIENT_ID = gql`
query findProjectsByClientId($clientId: String! $userId : String!){
  findProjectsByClientId(clientId : $clientId userId:$userId){
        id
        name
    }
}
`
export const GET_ALL_PROJECTS = gql`
query{
    getAllProjects{
      logoUrl
      name
      id
    }
  }
`
export const GET_ALL_EVENTS_ALL_TYPES = gql`
query getAllEventsAllTypes($id :String!){
  getAllEventsAllTypes(id : $id){
    type
    id
    period
    creation
    state
    project{
      id
      name
    }
    creator {
      id
      firstname
      lastname
      email
      avatarUrl
      username
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
    period
    state
    project{
      id
      name
    }
    creator {
      id
      firstname
      lastname
      email
      avatarUrl
      username
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
    period
    description
    status
    state
    creation
    contributors{
      id
      firstname
      lastname
      email
      avatarUrl
      username
    }
    creator {
      id
      firstname
      lastname
      email
      username
      avatarUrl
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