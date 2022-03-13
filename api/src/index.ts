import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { Users } from './entities/Users'

const PORT = 3001

const main = async () => {

    await createConnection({
        type: "mysql",
        database: 'kifekoi',
        username: "root",
        password: "elektra1",
        logging: true,
        synchronize: false,
        entities: [Users]
    })
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.use("/graphql", graphqlHTTP({ schema, graphiql: true }))
    app.listen(PORT, () => {
        console.log(`API running correctly on http://localhost:${PORT}`)
    })
}
main().catch((err) => {
    console.log(err)
})