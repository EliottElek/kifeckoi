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
exports.FIND_PROJECTS_BY_CLIENT_ID = exports.FIND_PROJECT_BY_PROJECT_ID = exports.GET_ALL_PROJECTS = void 0;
const graphql_1 = require("graphql");
const Project_1 = require("../typedefs/Project");
const Project_2 = require("../../entities/Project");
const Client_1 = require("../../entities/Client");
exports.GET_ALL_PROJECTS = {
    type: new graphql_1.GraphQLList(Project_1.ProjectType),
    resolve() {
        return Project_2.Project.find({ relations: ["client", "events", "contributors"] });
    }
};
exports.FIND_PROJECT_BY_PROJECT_ID = {
    type: Project_1.ProjectType,
    args: {
        id: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const project = yield Project_2.Project.findOne({ id: id }, { relations: ["client", "events", "contributors"] });
            if (!project)
                throw new Error("Cannot find project.");
            return project;
        });
    }
};
exports.FIND_PROJECTS_BY_CLIENT_ID = {
    type: new graphql_1.GraphQLList(Project_1.ProjectType),
    args: {
        id: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const client = yield Client_1.Client.findOne({ id: id }, { relations: ["client", "events", "contributors"] });
            return client === null || client === void 0 ? void 0 : client.projects;
        });
    }
};
