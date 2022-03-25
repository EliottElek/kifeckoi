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
export const GET_ALL_ACTIONS = gql`
query{
    getAllActions{
    name
    id
    creation
    project{
      id
      name
    }
    description
    status
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
export const GET_LATEST_ACTIONS = gql`
query{
    getLatestActions{
    name
    id
    creation
    project{
      id
      name
    }
    description
    status
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
export const FIND_ACTIONS_BY_PROJECT_ID = gql`
query findActionsByProjectId($id: String!){
  findActionsByProjectId(id : $id){
    name
    id
    description
    status
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

