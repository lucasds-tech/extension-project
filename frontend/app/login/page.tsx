import { useState } from "react"

export default function LoginPage() {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")

  const handleLogin=async(e:any)=>{
    e.preventDefault()

    const response=await fetch("http://localhost:8080/api/v1/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({username,password})
    })

    if(response.ok){
      const data=await response.json()
      document.cookie=`token=${data.token}; path=/`
      localStorage.setItem("token",data.token)
      window.location.href="/"
    }else{
      alert("Login inválido")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="border p-8 rounded-xl w-[350px] bg-white shadow">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-500">SafeEntry</h1>

        <input className="w-full border p-3 rounded mb-4"
        placeholder="Usuário"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}/>

        <input type="password"
        className="w-full border p-3 rounded mb-4"
        placeholder="Senha"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>

        <button className="w-full bg-black text-white p-3 rounded">
          Entrar
        </button>
      </form>
    </div>
  )
}
