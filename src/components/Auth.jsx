import React, { useState } from 'react'
import {auth,googleProvider} from "../config/firebaseConfig"
import {createUserWithEmailAndPassword,signInWithPopup} from "firebase/auth"
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Auth = () => {

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const regex = /^[a-zA-Z]+[0-9a-zA-Z.]*@[0-9a-zA-Z]+\.[a-zA-Z]+$/

    let message = ""
    const notification = ()=>toast(<div>{message}</div>,{
        className:"bg-red-500 text-white font-bold"
    })

    const signIn = async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password)
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
    
    const verify = ()=>{
        if(email.trim().length===0 ||regex.test(email.trim()) === false)
        {
            message = "Enter a valid Email Address"
            notification()
        }
        else if(password.length<6)
        {
            message  = "Password should be 6 characters minimum!"
            notification()
        }
        else if(password===confirmPassword)
        {
            if(regex.test(email.trim())  )
            {
                signIn()
            }
            // else
            // {
            //     message = "Enter a valid Email Address"
            //     notification()
            // }
        }
        else{
            message = "Passwords don't match!!"
            notification()
        }
    }

  return (
    <div className='flex items-center justify-center h-[600px]'> 
        <div className='border-2 p-4 w-[450px]'>
            <div className='flex flex-col gap-2'>
                <div>
                <h1 className='text-2xl font-bold text-center'>Sign Up</h1>

                </div>
                <div className='flex flex-col gap-2'>
                <label className='text-lg font-semibold'>Email:</label>
            <input type='email'className='border-2 p-1' placeholder='Enter Email' onChange={(e)=>setEmail(e.currentTarget.value)}/>
                </div>
            <div className='flex flex-col gap-2'>
            <label className='text-lg font-semibold'>Password:</label>
            <input type='password'className='border-2 p-1' placeholder='Enter Password(6 characters minimum)' onChange={(e)=>setPassword(e.currentTarget.value)}/>
            </div>
            <div className='flex flex-col gap-2'>
            <label className='text-lg font-semibold'>Confirm Password:</label>
            <input type='password'className='border-2 p-1' placeholder='Confirm Password' onChange={(e)=>{
                setConfirmPassword(e.currentTarget.value)
                
            }}/>
            </div>
            <div className='flex justify-center'>
            <button onClick={verify} className='rounded-full px-4 py-2 bg-black font-bold text-white hover:bg-gray-700 '>Sign up</button>

            </div>
            <h2 className='text-center font-semibold '>Or</h2>
            <div className='flex justify-center'>
            <button className='rounded-full border-2 border-black font-bold px-4 py-2 hover:text-white hover:bg-black' onClick={signUpwithgoogle}>Sign up with <i class="fa-brands fa-google" ></i></button>

            </div>
            <div className='text-center font-semibold'>
            <Link to="/login">
            <h5>Already a user? Login here! </h5> 

            </Link>
            </div>
           

            
            </div>
        
        
        
        {/* <br></br>
        <button onClick={logout}>Sign Out</button> */}
        </div>
        

    </div>
  )
}

export default Auth