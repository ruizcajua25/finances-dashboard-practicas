import { createMongoClient } from "@/lib/mongodb";
import { encryptPassword } from "@/lib/utils";


export async function POST(request: Request) { 
  const body = await request.json();
  const { username, password } = body;
  const mongo = await createMongoClient();
  
  const db = mongo.db("miapp");

  // paso 1: encriptar la contraseña
  const passwordToSave = encryptPassword(password);
  
  // paso 2: insertar en la base de datos usuario y password encriptada
  try {
    await db.collection("users").insertOne({ username, password: passwordToSave });
    // paso 3: devolver 201
    return new Response(null, { status: 201 });
  } catch (error) {
    // si falla devuelvo un error
    console.error("Error creating user: ", error);
    return new Response(null, { status: 500 });
  }
}