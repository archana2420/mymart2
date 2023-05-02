import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from './CartItems'

import { calculateTotal, clearCart } from '../features/cart/cartSlice'
import { clearFromCart } from '../features/cart/productsSlice'
import { toast } from 'react-toastify'
import ClearCartModal from './ClearCartModal'
import { displayClearCartModal } from '../features/cart/clearCartModalSlice'
import { Link } from 'react-router-dom'




const Cart = () => {
    const {cartList ,isLoading,total} = useSelector((store)=>store.cart)
    const {isOpen} = useSelector((store)=>store.clearCartModalToggle)
    console.log(isOpen)

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(calculateTotal())
    },[cartList])
    useEffect(()=>{

    },[cartList,isOpen])

    if(isLoading){
        return <div className='flex justify-center items-center my-4'>
                <h2 className='text-4xl font-bold'>Loading..</h2>
        </div>
    }
    if(cartList < 1)
    {
      return (
        <div className='m-4 p-4 flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-center my-4 font-bold'>Cart</h1>
            <h4 className='text-xl text-center'>Your Cart is Empty!!</h4>
            <img src="https://previews.123rf.com/images/texelart/texelart1106/texelart110600008/9779805-man-pushing-a-shopping-cart-empty.jpg" alt="cart" className='h-80 my-8' />
            </div>
      )
    }

   
  return (
    <div className='relative w-full h-full flex justify-center items-center z-3'>
      <div className={!isOpen?'m-4 p-4 flex flex-col justify-center items-center':'m-4 p-4 flex flex-col justify-center items-center blur-sm'}>
      <h1 className='md:text-4xl text-center my-4 font-bold'>Cart</h1>
        <div className='mx-3'>
        {cartList.map((item)=>{
            return <CartItems key={item.id} {...item}></CartItems>
        })}
        <div className='w-full h-1 border-b-2 border-black'></div>
        <div className='flex justify-between'>
        <div className='md:text-xl font-bold '>Total: </div>
        <div className='md:text-xl font-bold'>₹{total}</div>
        </div>
        
        </div>
        <div className='flex gap-8'>
        <button className='rounded-full mt-10 px-4 py-2 font-bold text-xs  text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white md:text-base' onClick={()=>dispatch(displayClearCartModal())}
        
        >Clear Cart</button>
        <Link to="/payment">
        <div className='rounded-full mt-10 px-4 py-2 font-bold text-xs  text-green-500  border-2 border-green-500 hover:text-white hover:bg-green-500 md:text-base'>Proceed to Payment</div>

        </Link>
        </div>
      </div>
     {isOpen && <ClearCartModal/>}
        
        
    </div>
  )
}

export default Cart