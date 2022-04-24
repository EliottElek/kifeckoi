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
exports.FIND_EVENTS_BY_PROJECT_ID = exports.GET_LATEST_EVENTS = exports.GET_ALL_EVENTS = void 0;
const graphql_1 = require("graphql");
const Event_1 = require("../typedefs/Event");
const Event_2 = require("../../entities/Event");
exports.GET_ALL_EVENTS = {
    type: new graphql_1.GraphQLList(Event_1.EventType),
    args: {
        type: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = args;
            return yield Event_2.Event.find({
                where: { type: type }, relations: ["project", "comments", "creator", "contributors"],
            });
        });
    }
};
exports.GET_LATEST_EVENTS = {
    type: new graphql_1.GraphQLList(Event_1.EventType),
    args: {
        type: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, type } = args;
            var events = yield Event_2.Event.find({
                where: { projectId: id, type: type }, relations: ["project", "comments", "creator", "contributors"],
            });
            var sorted_events = events.sort((a, b) => {
                console.log(a.creation);
                console.log(b.creation);
                return (new Date(a.creation).getTime() - new Date(b.creation).getTime());
            });
            return sorted_events.splice(0, 10).reverse();
        });
    }
};
exports.FIND_EVENTS_BY_PROJECT_ID = {
    type: new graphql_1.GraphQLList(Event_1.EventType),
    args: {
        type: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, type } = args;
            const events = yield Event_2.Event.find({
                where: { projectId: id, type: type }, relations: ["project", "comments", "creator", "contributors"],
            });
            if (!events)
                throw new Error("Cannot find project.");
            return events;
        });
    }
};
