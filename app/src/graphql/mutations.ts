import { gql } from "@apollo/client"

export const CREATE_USER = gql`
mutation createUser($firstname: String! $lastname : String! $email : String! $avatarUrl : String! $username : String! $password : String!){
    createUser(firstname : $firstname lastname : $lastname email : $email avatarUrl : $avatarUrl username : $username password : $password){
        successful
        message
        token
    }
}
`
export const LOGIN = gql`
mutation login($email: String! $password: String!){
  login(email : $email password : $password){
    successful
    message
    token
    } 
  }
`
export const CREATE_CLIENT = gql`
mutation createClient($name: String! $userId : String!){
    createClient(name : $name userId : $userId){
        id
        name
    }
}
`
export const CREATE_PROJECT = gql`
mutation createProject($name: String! $clientId: String! $contributors : [String!]){
    createProject(name: $name clientId: $clientId contributors : $contributors){
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
mutation createEvent($type: String! $projectId: String! $description : String! $contributors : [String!] $status : String! $creatorId: String! $period: String! $index: Int!){
    createEvent(type: $type  projectId: $projectId description : $description contributors : $contributors status : $status creatorId : $creatorId period : $period index:$index){
        type
        id
        description
        status
        creation
        period
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
                avatarUrl
                email
            }
    }
}
`

export const CHANGE_EVENT_STATE = gql`
mutation changeEventState($eventId: String! $newState: String!){
    changeEventState(eventId: $eventId  newState: $newState){
        message
    }
}
`

export const CHANGE_EVENT_STATUS = gql`
mutation changeEventStatus($eventId: String! $newStatus: String! $index: Int!){
    changeEventStatus(eventId: $eventId  newStatus: $newStatus index:$index){
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
export const DELETE_COMMENT = gql`
mutation deleteComment($commentId: String!){
    deleteComment(commentId: $commentId){
        id
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
export const CHANGE_COMMENT__CONTENT = gql`
mutation changeCommentContent($commentId: String! $newContent: String!){
    changeCommentContent(commentId : $commentId newContent : $newContent){
        id
    }
}
`
export const ADD_CONTRIBUTORS_TO_PROJECT = gql`
mutation addContributorsToProject($projectId : String! $contributors : [String!]){
    addContributorsToProject(projectId:$projectId contributors:$contributors){
        id
    }
}
`
export const REMOVE_CONTRIBUTORS = gql`
mutation removeContributors($projectId : String! $contributors : [String!]){
    removeContributors(projectId:$projectId contributors:$contributors){
        id
    }
}`

export const DELETE_MULTIPLE_EVENTS = gql`
mutation deleteMultipleEvents($eventIds : [String!]){
    deleteMultipleEvents(eventIds:$eventIds){
        message
        successful
    }
}
`
export const ADD_CONTRIBUTORS_TO_EVENT = gql`
mutation addContributorsToEvent($eventId : String! $contributors : [String!]){
    addContributorsToEvent(eventId:$eventId contributors:$contributors){
        id
    }
}
`

export const MODIFY_PROJECT_GLOBAL_INFOS = gql`
mutation modifyProjectGlobalInfos($projectId : String!  $globalStatus: String! $planningStatus: String! $perimeterStatus: String! $globalDescription: String! $planningDescription: String! $perimeterDescription: String! $goLiveDate: String! $goCopyDate: String! $logoUrl: String!){
    modifyProjectGlobalInfos(projectId:$projectId globalStatus:$globalStatus planningStatus:$planningStatus perimeterStatus:$perimeterStatus globalDescription:$globalDescription planningDescription:$planningDescription perimeterDescription:$perimeterDescription goLiveDate:$goLiveDate goCopyDate:$goCopyDate logoUrl:$logoUrl){
        id
    }
}
`
export const MODIFY_PROJECT_NAME = gql`
mutation modifyProjectName($projectId : String! $name: String!){
    modifyProjectName(projectId:$projectId name:$name){
        id
    }
}
`
export const MENTION_USERS_IN_EVENT = gql`
mutation mentionUsersInEvents($eventId: String! $mentionContext: String! $userIds: [String!]){
    mentionUsersInEvents(eventId : $eventId mentionContext : $mentionContext  userIds : $userIds){
    successful
    message
    } 
  }
`
export const CREATE_NOTIFICATION = gql`
mutation createNotification($projectId: String! $content:String! $emitterId: String! $message: String! $redirect: String! $receivers:[String!]){
    createNotification (projectId : $projectId content : $content emitterId : $emitterId redirect: $redirect message: $message receivers : $receivers){
      message
    }
  }
  `
export const READ_NOTIFICATION = gql`
  mutation readNotification($userId: String! $notificationId:String!){
    readNotification (userId : $userId notificationId : $notificationId){
        message
      }
    }
    `

export const CAPTURE_EVENTS_POSITIONS = gql`
  mutation captureEventsPositions($events: [String!] $indexes: [Int!]){
    captureEventsPositions (events : $events indexes:$indexes){
        message
      }
    }
    `

export const CREATE_NEW_EVENTS_SCHEMA = gql`
  mutation createNewEventsSchema($projectId: String! $title: String! $userId: String!){
    createNewEventsSchema (projectId : $projectId title:$title userId:$userId){
        message
      }
    }
    `
export const CREATE_NEW_EVENTS_STATUS = gql`
    mutation createNewEventsStatus($projectId: String! $title: String! $schemaId: String! $userId: String!){
        createNewEventsStatus(projectId : $projectId title:$title schemaId:$schemaId userId:$userId){
          message
        }
      }
      `

export const UPDATE_EVENTS_SCHEMA_BG = gql`
mutation updateEventsSchemaBg($userId: String! $schemaId: String! $backgroundUrl: String! ){
    updateEventsSchemaBg(userId:$userId schemaId:$schemaId backgroundUrl:$backgroundUrl){
        message
    }
}
`
export const DELETE_EVENTS_STATUS = gql`
mutation deleteEventsStatus($id:String! $type: String!){
    deleteEventsStatus(id : $id type: $type){
        message
    }
}
`
export const RENAME_EVENTS_STATUS = gql`
mutation renameEventsStatus($id: String! $title: String! $type: String!){
    renameEventsStatus(id:$id title: $title type: $type){
        message
    }
}
`