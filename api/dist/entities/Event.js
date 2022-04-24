"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const Comment_1 = require("./Comment");
const Project_1 = require("./Project");
const User_1 = require("./User");
let Event = class Event extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "creation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Project_1.Project, project => project.events, { onDelete: 'CASCADE' }),
    __metadata("design:type", Project_1.Project)
], Event.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.createdEvents, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_1.User)
], Event.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, contributor => contributor.events),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Event.prototype, "contributors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, comment => comment.event),
    __metadata("design:type", Array)
], Event.prototype, "comments", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
exports.Event = Event;
