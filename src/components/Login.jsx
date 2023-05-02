import React, { useState } from 'react'
import {auth,googleProvider} from "../config/firebaseConfig"
import {signInWithEmailAndPassword,signInWithPopup} from "firebase/auth"
import {Link, useNavigate} from "react-router-dom"


const Login = () => {

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const login = async()=>{
        try{
            await signInWithEmailAndPassword(auth,email,password)
            navigate("/dashboard")
            

        }
        catch(error)
        {
            console.error(error)
        }
    }
    const signUpwithgoogle = async()=>{
        try{
            await signInWithPopup(auth,googleProvider)
            navigate("/dashboard")

        }
        catch(error)
        {
            console.error(error)
        }
    }
  return (
    <div className='flex items-center justify-center h-[600px] '> 
        <div className='border-2 p-4 w-[450px]'>
            <div className='flex flex-col gap-2'>
                <div>
                <h1 className='text-2xl font-bold text-center'>Login</h1>

                </div>
                <div className='flex flex-col gap-2'>
                <label className='text-lg font-semibold'>Email:</label>
            <input type='email'className='border-2 p-1' placeholder='Enter Email' onChange={(e)=>setEmail(e.currentTarget.value)}/>
                </div>
            <div className='flex flex-col gap-2'>
            <label className='text-lg font-semibold'>Password:</label>
            <input type='password'className='border-2 p-1' placeholder='Enter Password' onChange={(e)=>setPassword(e.currentTarget.value)}/>
            </div>
            <div className='flex justify-center'>
            <button onClick={login} className='rounded-full px-4 py-2 bg-black font-bold text-white hover:bg-gray-700 '>Login</button>

            </div>
            <h2 className='text-center font-semibold '>Or</h2>
            <div className='flex justify-center'>
            <button className='rounded-full border-2 border-black font-bold px-4 py-2 hover:text-white hover:bg-black' onClick={signUpwithgoogle} >Login with <i class="fa-brands fa-google" ></i></button>

            </div>
            <Link to="/">
            <h2 className='text-center font-semibold '>Don't have account? Sign up here!</h2>

            </Link>
            </div>
        
        
        
        {/* <br></br>
        <button onClick={logout}>Sign Out</button> */}
        </div>
        

    </div>
  )
}

export default Login