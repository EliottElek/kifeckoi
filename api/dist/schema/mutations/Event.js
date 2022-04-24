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
exports.ADD_CONTRIBUTORS_TO_EVENT = exports.DELETE_EVENT = exports.CHANGE_EVENT_DESCRIPTION = exports.CHANGE_EVENT_STATE = exports.CREATE_EVENT = void 0;
const { v4: uuid } = require("uuid");
const graphql_1 = require("graphql");
const Project_1 = require("../../entities/Project");
const Event_1 = require("../../entities/Event");
const User_1 = require("../../entities/User");
const Event_2 = require("../typedefs/Event");
const Message_1 = require("../typedefs/Message");
exports.CREATE_EVENT = {
    type: Event_2.EventType,
    args: {
        type: { type: graphql_1.GraphQLString },
        projectId: { type: graphql_1.GraphQLString },
        creatorId: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        contributors: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        status: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, projectId, description, contributors, status, creatorId } = args;
            const newuuid = uuid();
            const project = yield Project_1.Project.findOne({ id: projectId });
            const contributorsFound = [];
            const creatorFound = yield User_1.User.findOne({ id: creatorId });
            const creationDate = new Date();
            if (!project) {
                throw new Error("Cannot find project.");
            }
            else {
                const newEvent = Event_1.Event.create({ type: type, id: newuuid, projectId: projectId, contributors: [], project: project, description: description, status: status, creation: creationDate.toString() });
                yield Event_1.Event.save(newEvent);
                if (!creatorFound) {
                    throw new Error("Cannot find project.");
                }
                else {
                    newEvent.creator = creatorFound;
                }
                contributors.map((contributor) => __awaiter(this, void 0, void 0, function* () {
                    const acc = yield User_1.User.findOne({ id: contributor });
                    if (acc) {
                        newEvent.contributors.push(acc);
                        contributorsFound.push(acc);
                    }
                }));
                yield Event_1.Event.save(newEvent);
                yield Project_1.Project.save(project);
            }
            return Object.assign(Object.assign({}, args), { id: newuuid, contributors: contributorsFound, creator: creatorFound, creation: creationDate.toString() });
        });
    }
};
exports.CHANGE_EVENT_STATE = {
    type: Message_1.MessageType,
    args: {
        eventId: { type: graphql_1.GraphQLString },
        newStatus: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId, newStatus } = args;
            const event = yield Event_1.Event.findOne({ id: eventId });
            if (!event)
                throw new Error("Cannot find event.");
            yield Event_1.Event.update({ id: eventId }, { status: newStatus });
            return { successful: true, message: "Event's state was successfully updated." };
        });
    }
};
exports.CHANGE_EVENT_DESCRIPTION = {
    type: Message_1.MessageType,
    args: {
        eventId: { type: graphql_1.GraphQLString },
        newDescription: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId, newDescription } = args;
            const event = yield Event_1.Event.findOne({ id: eventId });
            if (!event)
                throw new Error("Cannot find event.");
            yield Event_1.Event.update({ id: eventId }, { description: newDescription });
            return { successful: true, message: "Event's description was successfully updated." };
        });
    }
};
exports.DELETE_EVENT = {
    type: Message_1.MessageType,
    args: {
        eventId: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = args;
            yield Event_1.Event.delete({ id: eventId });
            return { successful: true, message: "Event was successfully deleted." };
        });
    }
};
exports.ADD_CONTRIBUTORS_TO_EVENT = {
    type: Event_2.EventType,
    args: {
        eventId: { type: graphql_1.GraphQLString },
        contributors: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId, contributors } = args;
            const event = yield Event_1.Event.findOne({ id: eventId }, { relations: ["contributors"] });
            var contributorsFound = [];
            if (!event) {
                throw new Error("Cannot find event.");
            }
            else {
                event.contributors = [];
                contributors.map((contributor) => __awaiter(this, void 0, void 0, function* () {
                    const acc = yield User_1.User.findOne({ id: contributor });
                    if (acc) {
                        event.contributors.push(acc);
                    }
                }));
                contributorsFound = event.contributors;
                Event_1.Event.save(event);
            }
            return Object.assign(Object.assign({}, args), { contributorsFound });
        });
    }
};
