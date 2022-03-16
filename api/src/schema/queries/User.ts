import { GraphQLList } from "graphql"
import { UserType } from "../typedefs/User"
import { User } from '../../entities/User'
export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve() {
        return User.find();
    }
}
