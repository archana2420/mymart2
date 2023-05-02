import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addtocart, decreaseQuantity, increaseQuantity } from '../features/cart/cartSlice'
import { decrease, increase, hideAddToCart, displayAddToCart } from '../features/cart/productsSlice'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Product = ({id,title,image,price,quantity,isHidden}) => {
  
  const {cartList} = useSelector((state)=>state.cart)
  
  const dispatch = useDispatch()

  useEffect(()=>{

  },[isHidden])
 
  const addToCartNotification = ()=> toast(<div>{title} added to cart</div>,{
    className:"bg-green-500 text-white font-bold",
      
  })
  const removedFromCartNotification = () =>toast(<div>{title} removed from cart</div>,{
    className:"bg-red-500 text-white font-bold",
    
  })
  return (
    <div className='conatiner  w-full  h-80 flex flex-col justify-center items-center border-2 rounded-lg  md:w-1/4 '>
    
        <img src={image} className='h-[150px] w-[150px] md:h-40 w-40  '></img>
        <div className='container px-6 text-center text-base md:truncate  lg:text-xl hover:overflow-x-visible hover:text-clip  '>{title}</div>
        <h5 className='text-center font-bold'>₹{price}</h5>
        {!isHidden && <button className='bg-black py-1 px-3 text-white font-bold rounded-full my-3' onClick={()=>{
            dispatch(addtocart({id,title,image,price,quantity}))
            dispatch(increaseQuantity(id))
            dispatch(increase(id))
            dispatch(hideAddToCart(id))
            addToCartNotification()
           
            
            
        }}>Add to Cart</button>}
        {isHidden && <div className='flex my-3'>
        <button className='rounded-l border-2   font-bold text-black px-3 py-1' onClick={()=>{
          dispatch(decreaseQuantity(id))
          dispatch(decrease(id))
          if(quantity==1)
          {
            dispatch(displayAddToCart(id))
            removedFromCartNotification()
          }
        }}>-</button>
        <h5 className='border-2 font-bold  px-3 py-1'>{quantity}</h5>
        <button className='rounded-r border-2  font-bold  text-black px-3 py-1' onClick={()=>{
          dispatch(increaseQuantity(id))
          dispatch(increase(id))
        }}>+</button>
        </div>}
        
    </div>
  )
}

export default Product