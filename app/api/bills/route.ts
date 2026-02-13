import { createMongoClient } from "@/lib/mongodb";

export async function GET() {
  const mongo = await createMongoClient();


  const db = mongo.db("miapp");

  const data = await db.collection("bills").find({}).toArray();

  return Response.json(data);
}
