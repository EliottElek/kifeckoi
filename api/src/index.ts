import express from 'express'
import { schema } from './schema'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { User } from './entities/User'
import { Client } from './entities/Client'
import { Project } from './entities/Project'
import { Event } from './entities/Event'
import { Comment } from './entities/Comment'
import { ApolloServer } from "apollo-server-express"
import jwt from 'jsonwebtoken'
import { createServer } from "http"
const SECRET_KEY = 'secret!'
process.env["KIFEKOI_ENV"] = 'prod';

const config = {
    PORT: process.env.PORT || 3002, host: process.env["KIFEKOI_ENV"] === "dev" ? "localhost" : "eu-cdbr-west-02.cleardb.net",
    database: process.env["KIFEKOI_ENV"] === "dev" ? "kifekoi" : "heroku_211d386b351cda0",
    username: process.env["KIFEKOI_ENV"] === "dev" ? "root" : "bbd85b03c94878",
    password: process.env["KIFEKOI_ENV"] === "dev" ? "elektra1" : "f93317de",
}
interface JwtPayload {
    id: string,
    email: string
}

const main = async () => {

    await createConnection({
        type: "mysql",
        host: config.host,
        database: config.database,
        username: config.username,
        password: config.password,
        logging: true,
        synchronize: false,
        entities: [User, Client, Project, Event, Comment]
    })
    const app = express()
    app.use(cors())
    app.use(express.json())
    const getUser = async (token: string) => {
        if (token !== "" && token) {
            try {
                const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
                var userId = decoded.id;
                const user = await User.findOne({ id: userId })
                if (!user) return false;
                return user
            } catch {
                return false;
            }
        } return false;
    };
    const server = new ApolloServer({
        schema, context: async ({ req }) => {
            var auth = req.headers.authorization || "";
            var parts = auth.split(" ");
            var token = parts[1];
            const user = await getUser(token);
            return { user };
        }
    });
    await server.start()
    server.applyMiddleware({ app });
    const httpServer = createServer(app);

    httpServer.listen(config.PORT, () => {
        console.log(`API running correctly on http://${config.host}:${config.PORT}`)
    })
}
main().catch((err) => {
    console.log(err)
})