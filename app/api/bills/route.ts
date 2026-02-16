import { createMongoClient } from "@/lib/mongodb";
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers";


export async function GET({ request }: { request: Request }) {
  
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  // paso 1: verificar el token JWT
  if(!token) return
  jwt.verify(token, process.env.DB_SECRET!)
  
  // paso 2: decodificar el token para obtener la información del usuario
  const { payload: { username } } = jwt.decode(token, {complete: true})! as JwtPayload

  console.log(username)

  // paso 3: hacer la consulta a la base de datos para obtener las facturas del usuario
  const mongo = await createMongoClient();
  const db = mongo.db("miapp");
  
  const data = await db.collection("bills").find({ username }).toArray();

  // TODO: implementar pagination


  return Response.json(data);
}
