import { MongoClient, type Db } from "mongodb"

// First, check if the environment variable exists. Throw an error if it doesn't.
// This is a "fail-fast" approach and is good practice.
if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env.local file. Database features are disabled.")
}

// Since the check above passed, TypeScript now knows that process.env.MONGODB_URI is not undefined.
// We can safely declare `uri` as a string. This resolves the error.
const uri: string = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "sj_fitness"


// This global caching prevents creating new connections on every API call in development.
declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: { client: MongoClient | null; promise: Promise<MongoClient> | null } | undefined
}

let cached = global.__mongoClient
if (!cached) {
  cached = global.__mongoClient = { client: null, promise: null }
}

export async function getMongoClient(): Promise<MongoClient> {
  if (cached!.client) return cached!.client
  if (!cached!.promise) {
    // Now, when `uri` is used here, TypeScript knows it's a string.
    cached!.promise = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 }).connect()
  }
  cached!.client = await cached!.promise
  return cached!.client
}

// This function now explicitly asks for the correct database by name.
export async function getDb(): Promise<Db> {
  const client = await getMongoClient()
  return client.db(dbName) // This line ensures you are always in the 'sj_fitness' database.
}

