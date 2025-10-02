import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "sj_fitness"

if (!uri) {
  console.log("[v0] MONGODB_URI is not set. Database features will be disabled until configured.")
}

declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: { client: MongoClient | null; promise: Promise<MongoClient> | null } | undefined
}

let cached = global.__mongoClient
if (!cached) {
  cached = global.__mongoClient = { client: null, promise: null }
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!uri) throw new Error("Missing MONGODB_URI")
  if (cached!.client) return cached!.client
  if (!cached!.promise) {
    cached!.promise = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 }).connect()
  }
  cached!.client = await cached!.promise
  return cached!.client
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient()
  return client.db(dbName)
}
