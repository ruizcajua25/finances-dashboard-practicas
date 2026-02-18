import { createMongoClient } from "@/lib/mongodb";
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers";
import type { Bill } from "@/app/types";

async function getDB () {
  const mongo = await createMongoClient();
  const db = mongo.db("miapp");
  return db
}


export async function GET() {
  // paso 1: verificar el token JWT
  
  const db = await getDB()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const { payload: { username } } = jwt.decode(token!, {complete: true})! as JwtPayload
  if(!token) return
  jwt.verify(token, process.env.DB_SECRET!)

  const data = await db.collection("bills").find({ username }).toArray();

  // TODO: implementar pagination

  return Response.json(data);
}

export async function POST (request: Request) {
  const db = await getDB()
  const body = await request.json()
  const bill = body.bill as Bill

  if(!bill) return new Response('Need a bill', {status: 500})

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if(!token) return new Response('Need token', {status: 500})

  jwt.verify(token, process.env.DB_SECRET!)
  const { payload: { username } } = jwt.decode(token!, {complete: true})! as JwtPayload
  
  await db.collection("bills").insertOne({
    ...bill,
    username: username
  })

  return new Response(null, {status: 200}) 
}

export async function PUT (request : Request) {
  const db = await getDB()
  const body = await request.json()
  const bill = body.bill as Bill
  const id = body.id

  if(!bill) return new Response('Need a bill', {status: 400})
  if(!id) return new Response('Need a id', {status: 400})

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if(!token) return new Response('Need token', {status: 500})

  jwt.verify(token, process.env.DB_SECRET!)

  delete bill["_id"]

  await db.collection("bills").updateOne({id: id}, {
    $set: {
      ...bill
    }
  })

  return new Response(null, {status: 200})
}

export async function DELETE (request: Request) {
  const db = await getDB()
  const { id } = await request.json()
  
  if(!id) return new Response(null, {status: 400})

    console.log(id)
  const data = await db.collection('bills').deleteOne({id})
  console.log(data)

  return new Response(null, {status: 200})
}