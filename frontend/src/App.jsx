import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [msg, setMsg] = useState("")

  useEffect(()=>{
    axios.get("https://openapi-data-1.onrender.com/")
    .then((res)=> {
      console.log("Frontend connected to backend...")
      setMsg(res.data.message)
    }).catch((err)=> console.log("Error getting connected to backend...", err))
  },[])

  return (
    <>
    {msg}
    </>
  )
}

export default App
