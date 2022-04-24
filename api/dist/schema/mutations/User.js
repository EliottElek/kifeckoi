"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_AVATAR = exports.UPDATE_PASSWORD = exports.DELETE_USER = exports.CREATE_USER = void 0;
const User_1 = require("../typedefs/User");
const Message_1 = require("../typedefs/Message");
const gravatar_1 = __importDefault(require("gravatar"));
const graphql_1 = require("graphql");
const User_2 = require("../../entities/User");
exports.CREATE_USER = {
    type: User_1.UserType,
    args: {
        firstname: { type: graphql_1.GraphQLString },
        lastname: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        avatarUrl: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, email, avatarUrl, username, password } = args;
            const avatar = gravatar_1.default.url(email, { s: "100", r: "x", d: "retro" }, true);
            yield User_2.User.insert({ firstname, lastname, email, avatarUrl: avatarUrl ? avatarUrl : avatar, username, password });
            return args;
        });
    }
};
exports.DELETE_USER = {
    type: Message_1.MessageType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = args.id;
            yield User_2.User.delete(id);
            return { successful: true, message: "User was successfully deleted." };
        });
    }
};
exports.UPDATE_PASSWORD = {
    type: Message_1.MessageType,
    args: {
        email: { type: graphql_1.GraphQLString },
        oldPassword: { type: graphql_1.GraphQLString },
        newPassword: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, oldPassword, newPassword } = args;
            const user = yield User_2.User.findOne({ email: email });
            const userPassword = user === null || user === void 0 ? void 0 : user.password;
            if (!user)
                throw new Error("Cannot find user.");
            if (oldPassword === userPassword) {
                yield User_2.User.update({ email: email }, { password: newPassword });
                return { successful: true, message: "Password was successfully updated." };
            }
            else {
                throw new Error("Passwords do not match.");
            }
        });
    }
};
exports.UPDATE_AVATAR = {
    type: Message_1.MessageType,
    args: {
        email: { type: graphql_1.GraphQLString },
        avatarUrl: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, avatarUrl } = args;
            const user = yield User_2.User.findOne({ email: email });
            if (!user)
                throw new Error("Cannot find user.");
            yield User_2.User.update({ email: email }, { avatarUrl: avatarUrl });
            return { successful: true, message: "Avatar was successfully updated." };
        });
    }
};
