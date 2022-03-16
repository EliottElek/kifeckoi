import { gql } from "@apollo/client"

export const GET_ALL_USERS = gql`
query{
    getAllUsers{
      username
      name
      id
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
        }
        actions{
          id
          name
          description
          accountable
          status
        }
        infos{
          id
          name
          description
          accountable
          status
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