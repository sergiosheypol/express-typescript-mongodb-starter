import {MongoClient} from "mongodb";

type MongoCfg = {
  connectionString: string
  database: string
}

export const mongoCfg = (): MongoCfg => {
  return {
    connectionString: process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017",
    database: process.env.MONGODB_DATABASE || "default"
  }
}

export const setupMongoClient = async (): Promise<MongoClient> => {
  const cfg: MongoCfg = mongoCfg()

  const mongoClient = new MongoClient(cfg.connectionString)
  await mongoClient.connect()
  const db = await mongoClient.db(cfg.database)
  await db.command({ping: 1});

  console.debug(`connection established to db`)

  return mongoClient
}

