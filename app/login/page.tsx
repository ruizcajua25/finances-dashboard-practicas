'use client'
import { redirect } from "next/navigation";
import "../globals.css"
import { fetchApi } from "@/lib/utils";
import { useRouter } from "next/navigation";


export default function Login() {

  const router = useRouter()
  function handleLogin (event: any) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    
    const name = form.get('name')
    const password = form.get('password')

    fetchApi('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({username: name, password: password}),
      credentials: 'include'
    }).then(res => {
      console.log(res.status, new Date().toISOString(), process.env.NODE_ENV)
      if(res.status === 200) router.push('/')
    })

    return false
  }

  function handleSignUp (event: any) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name')
    const password = form.get('password')
    fetchApi('/api/auth/sign', {
      method: 'POST',
      body: JSON.stringify({username: name, password: password})
    })
    return false
  }
  
  return <>
    <form onSubmit={handleLogin}>
      <h1>login</h1>
      <input type="text" name="name" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>

    <form onSubmit={handleSignUp}>
      <h1>sign up</h1>
      <input type="text" name="name" />
      <input type="password" name="password" />
      <button type="submit">Sign Up</button>
    </form>
  </>
}