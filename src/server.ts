import * as dotenv from 'dotenv'
import express, {Express} from 'express'
import {mongoCfg, setupMongoClient} from "./mongoConfig";
import {MongoClient} from "mongodb";
import * as http from "http";
import {setupRoutes} from "./routes";
import {Controllers} from "./controllers";
import {Create} from "./app/create";

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080
app.use(express.json())

setupMongoClient().then(client => {
  // Setup DB
  const db = client.db(mongoCfg().database)

  // Wiring
  const create = new Create(db)
  const handlers = new Controllers(create)
  setupRoutes(app, handlers)

  // Run REST server
  const server = app.listen(port, () => {
    console.info(`Server is running at http://localhost:${port} 🚀`);
  })

  process.on('SIGTERM', async () => {
    await shutdownServer(server, client)
  });

  process.on('SIGINT', async () => {
    await shutdownServer(server, client)
  });

})

const shutdownServer = async (server: http.Server, mongoClient: MongoClient) => {
  server.close(async () => {
    await mongoClient.close()
    console.info("closing server...")
  })
}
