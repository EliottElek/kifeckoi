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
exports.CREATE_CLIENT = void 0;
const Client_1 = require("../typedefs/Client");
const { v4: uuid } = require("uuid");
const graphql_1 = require("graphql");
const Client_2 = require("../../entities/Client");
exports.CREATE_CLIENT = {
    type: Client_1.ClientType,
    args: {
        name: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const newid = uuid();
            const { name } = args;
            yield Client_2.Client.insert({ name: name, projects: [], id: newid });
            return Object.assign(Object.assign({}, args), { id: newid });
        });
    }
};
