import { createMongoClient } from "@/lib/mongodb";
import { pbkdf2Sync } from "crypto";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) { 
  const body = await request.json();
  const { username, password } = body;
  if(!username) {
    return NextResponse.json("You have to put a username", {status: 500})
  }
  if(!password) {
    return NextResponse.json("You have to put a password", {status: 500})
  }

  console.log(username, password)

  const mongo = await createMongoClient();
  const db = mongo.db("miapp");

  // paso 2: búsqueda en la base de datos usuario y password encriptada
  const [user] = await db.collection("users").find({username}).toArray()

  const [salt, hash] = user.password.split(':')

  const newHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  
  // paso 3: si el usuario existe, generar un token JWT
  if(newHash === hash) {
    const token = jwt.sign({
      username,
      hash
    }, process.env.DB_SECRET!, { expiresIn: '1h' })
    
    const cookieStore = await cookies()

    cookieStore.set("token", token, {
      httpOnly: true, // Evita que JS acceda a la cookie (Protección XSS)
      secure: process.env.NODE_ENV === "production", // Solo envía por HTTPS en producción
      sameSite: "strict", // Protección contra CSRF
      maxAge: 3600, // 1 hora en segundos
      path: "/", // Disponible en toda la app
    })
    // paso 4: devolver el token al cliente
    return new Response(null, {
      status: 200
    })
  }

  return new Response(null, {status: 500})
}