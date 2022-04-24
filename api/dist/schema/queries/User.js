"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_USERS = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../typedefs/User");
const User_2 = require("../../entities/User");
exports.GET_ALL_USERS = {
    type: new graphql_1.GraphQLList(User_1.UserType),
    resolve() {
        return User_2.User.find({ relations: ["events", "comments", "projects"] });
    }
};
