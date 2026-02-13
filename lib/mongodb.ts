import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function createMongoClient() {
  if(!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(process.env.MONGODB_URI!);
  }
  return global._mongoClientPromise;
}
