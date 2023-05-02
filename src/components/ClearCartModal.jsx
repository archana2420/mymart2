import React from 'react'
import { clearCart } from '../features/cart/cartSlice'
import { clearFromCart } from '../features/cart/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { closeClearCartModal } from '../features/cart/clearCartModalSlice'

const ClearCartModal = () => {
    const {cartList } = useSelector((store)=>store.cart)
    const dispatch = useDispatch()
    const clearedCartNotification = () => toast("All items from cart were removed",{
        className:"bg-red-500 text-white font-bold",
        
      })
      
  return (
    <div className='absolute  h-[150px]   flex justify-center flex-col items-center bg-gray-100 border-2 w-[400px] md:h-[200px]  text-sm z-6'>
        
        <h1 className=' text-sm text-center font-bold md:text-base'>Are you sure you want to clear the cart?</h1>
        <div className='flex gap-4 mt-6'>
        <button className='rounded-full border-2 border-black px-4 py-2 font-bold text-xs hover:bg-black hover:text-white md:text-base' onClick={()=>dispatch(closeClearCartModal())}>Cancel</button>
        <button className='rounded-full border-2 border-red-500  text-red-500 px-4 py-2 font-bold text-xs hover:bg-red-500 hover:text-white md:text-base' onClick={()=>
        {
          let listOfIds = []
          cartList.map((item)=>{
            listOfIds.push(item.id)
        })
          dispatch(clearFromCart(listOfIds))
          dispatch(clearCart())
          dispatch(closeClearCartModal())
          clearedCartNotification()
        }

        
        }>Yes, Clear cart</button>
        </div>
        
    </div>
  )
}

export default ClearCartModal