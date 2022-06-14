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
      comments{
        id
      }
      avatarUrl
      username
      projects{
        id
        name
        creation
      }
      events{
        id
      }
      notifications{
        id
        seen
        emitter{
          id
          firstname
          lastname
          avatarUrl
        }
        project{
          id
          name
        }
        redirect
        content
        message
      }
    } 
  }
`
export const GET_ALL_CLIENTS = gql`
query getAllClients($userId : String!){
    getAllClients(userId : $userId){
      name
      id
      creation
      contributors{
        id
        username
        avatarUrl
        firstname
      }
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
        creation
        creator{
          id
          username
          avatarUrl
          email
          firstname
          lastname
        }
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
        creation
        logoUrl
        contributors{
          id
          username
          avatarUrl
          firstname
        }
    }
}
`
export const GET_ALL_PROJECTS = gql`
query getAllProjects($id :String!){
  getAllProjects(id : $id){
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
query getLatestEvents($id: String!){
  getLatestEvents(id : $id){
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
export const RETURN_NOTIFICATIONS_BY_USER_ID = gql`
query returnNotificationsByUserId ($userId : String!){
  returnNotificationsByUserId (userId : $userId){
        id
        creation
        seen
        emitter{
          id
          firstname
          lastname
          avatarUrl
        }
        project{
          id
          name
        }
        redirect
        content
        message
      }
    }`