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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const Event_1 = require("./Event");
const Client_1 = require("./Client");
const User_1 = require("./User");
let Project = class Project extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Client_1.Client, client => client.projects, { onDelete: 'CASCADE' }),
    __metadata("design:type", Client_1.Client)
], Project.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Event_1.Event, event => event.project),
    __metadata("design:type", Array)
], Project.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, contributor => contributor.projects),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Project.prototype, "contributors", void 0);
Project = __decorate([
    (0, typeorm_1.Entity)()
], Project);
exports.Project = Project;
