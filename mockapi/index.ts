import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
const port = 800

const mockBills = [
  { id: 1, name: 'Electricidad', amount: 65.75, dueDate: new Date(2026, 1, 20) },
  { id: 2, name: 'Agua', amount: 28.5, dueDate: new Date(2026, 1, 25) },
  { id: 3, name: 'Internet', amount: 40.0, dueDate: new Date(2026, 1, 1) },
  { id: 4, name: 'Suscripción streaming', amount: 12.99, dueDate: new Date(2026, 1, 15) },
]

app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

app.get('/api/bills', (_, res) => {
  res.send(JSON.stringify(mockBills))
})

app.post('/api/bills', (req) => {
  console.log(req.body)
})

app.post('/api/auth/login', (req, res) => {
  console.log('estoy en la api')
  const { username, password } = req.body;

  console.log(username, password, process.env.DB_SECRET)

  const token = jwt.sign(
    { username, password }, 
    process.env.DB_SECRET!, // Pon un fallback por si el env falla en test
    { expiresIn: '1h' }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600000, // ¡ATENCIÓN! Express usa milisegundos, Next usa segundos. 1 hora = 3600000 ms
    path: "/",
  });

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})