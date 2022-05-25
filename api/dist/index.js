"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Client_1 = require("./entities/Client");
const Project_1 = require("./entities/Project");
const Event_1 = require("./entities/Event");
const Comment_1 = require("./entities/Comment");
const config = {
  PORT: process.env.PORT || 3002,
  host:
    process.env["KIFEKOI_ENV"] === "dev"
      ? "localhost"
      : "eu-cdbr-west-02.cleardb.net",
  database:
    process.env["KIFEKOI_ENV"] === "dev" ? "kifekoi" : "heroku_211d386b351cda0",
  username: process.env["KIFEKOI_ENV"] === "dev" ? "root" : "bbd85b03c94878",
  password: process.env["KIFEKOI_ENV"] === "dev" ? "elektra1" : "f93317de",
};
const main = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
      type: "mysql",
      host: config.host,
      database: config.database,
      username: config.username,
      password: config.password,
      logging: true,
      synchronize: true,
      entities: [
        User_1.User,
        Client_1.Client,
        Project_1.Project,
        Event_1.Event,
        Comment_1.Comment,
      ],
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(
      "/graphql",
      (0, express_graphql_1.graphqlHTTP)({
        schema: schema_1.schema,
        graphiql: true,
      })
    );
    app.listen(config.PORT, () => {
      console.log(
        `API running correctly on http://${config.host}:${config.PORT}`
      );
    });
  });
main().catch((err) => {
  console.log(err);
});
