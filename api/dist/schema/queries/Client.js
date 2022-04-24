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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIND_CLIENT_BY_ID = exports.GET_ALL_CLIENTS = void 0;
const graphql_1 = require("graphql");
const Client_1 = require("../typedefs/Client");
const Client_2 = require("../../entities/Client");
exports.GET_ALL_CLIENTS = {
    type: new graphql_1.GraphQLList(Client_1.ClientType),
    resolve() {
        return Client_2.Client.find({ relations: ["projects"] });
    }
};
exports.FIND_CLIENT_BY_ID = {
    type: Client_1.ClientType,
    args: {
        id: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const client = yield Client_2.Client.findOne({ id: id }, { relations: ["projects"] });
            if (!client)
                throw new Error("Cannot find client.");
            return client;
        });
    }
};
