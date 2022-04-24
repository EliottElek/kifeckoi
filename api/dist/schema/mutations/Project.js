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
exports.ADD_CONTRIBUTORS_TO_PROJECT = exports.CREATE_PROJECT = void 0;
const Project_1 = require("../typedefs/Project");
const { v4: uuid } = require("uuid");
const graphql_1 = require("graphql");
const Project_2 = require("../../entities/Project");
const Client_1 = require("../../entities/Client");
const User_1 = require("../../entities/User");
exports.CREATE_PROJECT = {
    type: Project_1.ProjectType,
    args: {
        name: { type: graphql_1.GraphQLString },
        clientId: { type: graphql_1.GraphQLString },
        contributors: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, clientId, contributors } = args;
            const client = yield Client_1.Client.findOne({ id: clientId });
            const newid = uuid();
            const contributorsFound = [];
            if (!client) {
                throw new Error("Cannot find client.");
            }
            else {
                const newProject = Project_2.Project.create({ name, id: newid, client: client, contributors: [] });
                contributors.map((contributor) => __awaiter(this, void 0, void 0, function* () {
                    const acc = yield User_1.User.findOne({ id: contributor });
                    if (acc) {
                        newProject.contributors.push(acc);
                        contributorsFound.push(acc);
                    }
                }));
                yield Project_2.Project.save(newProject);
                yield Client_1.Client.save(client);
            }
            return Object.assign(Object.assign({}, args), { client: client, id: newid });
        });
    }
};
exports.ADD_CONTRIBUTORS_TO_PROJECT = {
    type: Project_1.ProjectType,
    args: {
        projectId: { type: graphql_1.GraphQLString },
        contributors: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId, contributors } = args;
            const project = yield Project_2.Project.findOne({ id: projectId }, { relations: ["contributors"] });
            let contributorsFound = [];
            if (!project) {
                throw new Error("Cannot find project.");
            }
            else {
                project.contributors = [];
                contributors.map((contributor) => __awaiter(this, void 0, void 0, function* () {
                    const acc = yield User_1.User.findOne({ id: contributor });
                    if (acc) {
                        project.contributors.push(acc);
                    }
                }));
                contributorsFound = project.contributors;
                Project_2.Project.save(project);
            }
            return Object.assign({}, args);
        });
    }
};
