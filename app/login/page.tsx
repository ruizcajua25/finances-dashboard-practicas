'use client'
import { redirect } from "next/navigation";
import "../globals.css"

export default function Login() {
  function handleLogin (event: any) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    
    const name = form.get('name')
    const password = form.get('password')

    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({username: name, password: password})
    }).then(res => {
      if(res.status === 200) redirect('/')
    })
  }

  function handleSignUp (event: any) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name')
    const password = form.get('password')
    fetch('/api/auth/sign', {
      method: 'POST',
      body: JSON.stringify({username: name, password: password})
    })
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