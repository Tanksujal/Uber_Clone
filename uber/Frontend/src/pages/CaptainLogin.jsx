import { useState } from "react"
import { Link } from "react-router-dom"

const CaptainLogin = () => {
    const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const [captainData,setCaptainData] = useState({})
    
        const submitHandler = (e) => {
            e.preventDefault();
            setCaptainData({
                email:email,
                password:password
            })
            setEmail('')
            setPassword('')
        }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
    <img className="w-14 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
  <form onSubmit={submitHandler}>
    <h3 className="text-lg font-medium mb-2">What's Your email</h3>
    <input type="email" placeholder="email@eexample.com"className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7 " value={email} onChange={(e)=>setEmail(e.target.value)} required/>
    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
    <input type="password"  placeholder="password" className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7 " value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <button className="bg-[#111111] text-white font-semibold  rounded px-4 py-2  w-full text-lg placeholder:text-base mb-2">Login</button>
    
  </form>
  <p className="text-center">Join a fleet?<Link className="text-blue-600" to={'/captain-signup'}>Register as a Captain</Link></p>
    </div>

    <div>
    <Link to={'/login'} className="bg-[#10b461] flex items-center justify-center mb-5 text-white font-semibold  rounded px-4 py-2  w-full text-lg placeholder:text-base mb-7 ">Sign in as User</Link>
    </div>
</div>
  )
}

export default CaptainLogin
