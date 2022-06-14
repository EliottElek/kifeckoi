import { gql } from "@apollo/client"

export const GET_NOTIFICATIONS_BY_USER_ID = gql`
subscription getNotificationsByUserId ($userId : String!){
    getNotificationsByUserId (userId : $userId){
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
    }`