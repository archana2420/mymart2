import React from 'react'
import { useDispatch } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../features/cart/cartSlice'
import { decrease, increase,displayAddToCart, clearFromCart } from '../features/cart/productsSlice'


const CartItems = (props) => {
  const dispatch = useDispatch()
  return (
   
        
    <div className='h-30 w-full flex justify-between my-3 border-2 border-gray-400 p-3 md:w-[650px]'>
            <div className='flex'>
            <img src={props.image} alt={props.title} className=' w-20 h-20'></img>
            <h5 className='max-w-[250px] text-xs flex items-center mx-3 h-full md:text-base md:max-w-[250px]'>{props.title}</h5>
            </div>
            <div className='flex '>
            <div  className='flex md:gap-2'>
            <button onClick={()=>{
              dispatch(decreaseQuantity(props.id))
              dispatch(decrease(props.id))
              if(props.quantity==1)
              {
                dispatch(displayAddToCart(props.id))
              }
            }}>
            <i class="fa-solid fa-circle-minus text-xs text-red-600 md:text-base" ></i>
            </button>
            <h5 className='text-xs font-bold md:text-base flex items-center mx-3 h-full '>{props.quantity}</h5>
        
        <button onClick={()=>{
              dispatch(increaseQuantity(props.id))
              dispatch(increase(props.id))
            }}>
            <i class="fa-solid fa-circle-plus text-xs text-green-600 md:text-base"></i>
            </button>
        </div>
       
        <div className='w-[60px] text-xs md:text-base flex  justify-center items-center font-bold md:w-[100px]'>₹{props.price}</div>
        <button className=' mx-2 md:mx-6' onClick={()=>{
              dispatch(removeFromCart(props.id))
              dispatch(clearFromCart([props.id]))
              dispatch(displayAddToCart(props.id))
            }}>
            <i class="fa-sharp fa-solid fa-trash text-xs  text-red-600 md:text-base "></i>
            </button>
            </div>
        
    </div>
    
  )
}

export default CartItems