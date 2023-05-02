import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom'

import {auth} from "../config/firebaseConfig"
import {signOut} from "firebase/auth"
import { clearFromCart } from '../features/cart/productsSlice'
import { clearCart } from '../features/cart/cartSlice'


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cartList,no_of_items} = useSelector((state)=>state.cart)

  const [dropdownOpen,setDropdownOpen] = useState(false)

  const logout = async()=>{
    try{
        await signOut(auth)
        let listOfIds = []
          cartList.map((item)=>{
            listOfIds.push(item.id)
        })
        dispatch(clearFromCart(listOfIds))
        dispatch(clearCart())
        setDropdownOpen(false)
        navigate("/")
    }
    catch(error)
    {
        console.error(error)
    }
}

 
  return (
    <nav className='w-full border-b-2 drop-shadow-2xl  p-4'>
        <div className='list-none mx-3 flex items-center justify-between'>
          <Link to="/dashboard">
          <div className='text-base text-black font-bold md:text-2xl'>My Mart</div>
          </Link>
          {auth?.currentUser&&<div className='flex gap-8 items-center'>
            {/* <Link to="/orders">
            <div className='font-bold'>Orders</div>
           
            </Link> */}
            
            
           
            <Link to="/cart">
              <div className='relative text-white' ><i className="fa-solid fa-cart-shopping fa-xl text-black z-3 "></i><span className='absolute -ml-2 -mt-2 px-1 text-xs text-black border-2 border-black rounded-full bg-white font-bold z-6'>{no_of_items}</span></div>
              </Link>
              
             
              {/* <button className='rounded-none px-4 py-2 bg-black text-white font-bold' onClick={logout}>Sign Out</button> */}

              <div >
                <div className='cursor-pointer' onClick={()=>setDropdownOpen(!dropdownOpen)}>
                <img  className='w8 h-8 rounded-full' src={auth?.currentUser?.photoURL?auth?.currentUser?.photoURL:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt={auth?.currentUser?.displayName?auth?.currentUser?.displayName:"user"}></img>

                </div>
              {dropdownOpen&&<div className='absolute right-0 mt-4 bg-white  border-2 font-bold rounded-none z-10'>
              <Link to="/orders">
              <div className='block px-4 py-2 hover:bg-black hover:text-white' onClick={()=>setDropdownOpen(!dropdownOpen)}>Orders</div>
              </Link>
              <hr></hr>
              <Link to="/dashboard">
              <div className='block px-4 py-2 hover:bg-black hover:text-white' onClick={()=>setDropdownOpen(!dropdownOpen)}>Dashboard</div>
              </Link>
              <hr></hr>
              <div className='block px-4 py-2 hover:bg-black hover:text-white cursor-pointer' onClick={logout} >Logout</div>
              
            </div>}
            </div>

            </div>}
          
            
        </div>
    </nav>
  )
}

export default Navbar