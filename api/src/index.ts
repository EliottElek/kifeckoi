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
import { Notification } from './entities/Notification'
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
import { EventsSchema } from './entities/EventsSchema'
import { EventsStatus } from './entities/EventsStatus'

const pubsub = new PubSub();

const SECRET_KEY = 'secret!'
process.env["KIFEKOI_ENV"] = 'dev';

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
        synchronize: true,
        entities: [User, Client, Project, Event, Comment, Notification, EventsSchema, EventsStatus]
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

    const httpServer = createServer(app);


    const server = new ApolloServer({
        schema, plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ], context: async ({ req }) => {
            var auth = req.headers.authorization || "";
            var parts = auth.split(" ");
            var token = parts[1];
            const user = await getUser(token);
            return { user, pubsub };
        },

    });
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    const getDynamicContext = async (ctx: any, msg: any, args: any) => {
        // ctx is the graphql-ws Context where connectionParams live

        if (ctx.connectionParams.authorization) {
            var parts = ctx.connectionParams.authorization.split(" ");
            var token = parts[1];

            const user = await getUser(token);
            return { user, pubsub };
        }
        // Otherwise let our resolvers know we don't have a current user
        return { user: null, pubsub };
    };
    const serverCleanup = useServer({
        schema, context: (ctx, msg, args) => {
            return getDynamicContext(ctx, msg, args);
        }
    }, wsServer);
    await server.start()
    server.applyMiddleware({ app });


    httpServer.listen(config.PORT, () => {
        console.info(`API running correctly on http://${config.host}:${config.PORT}`)
    })
}
main().catch((err) => {
    console.error(err)
})