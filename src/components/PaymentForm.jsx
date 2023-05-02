import axios from 'axios'
import React,{useState} from 'react'
import {CardElement,useElements,useStripe} from '@stripe/react-stripe-js'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { clearFromCart } from '../features/cart/productsSlice'
import {auth,db} from "../config/firebaseConfig"
import {addDoc,collection} from "firebase/firestore"



const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const PaymentForm = () => {

    const orderCollection = collection(db,"orders")
    const individualOrderCollection = collection(db,"individualOrder")
    const [sendingComplete,setSendingComplete] = useState(false)


    const [success,setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    
    const dispatch = useDispatch()
    const {cartList,total } = useSelector((store)=>store.cart)

    const sendOrderData = async(id)=>{
        const orderID = await addDoc(orderCollection,{
            orderTime:new Date(),
            paymentID:id,
            userID:auth?.currentUser?.uid,
            Bill_Amount:Number(total)
        }).then((orderCollection)=>orderCollection.id)

        console.log("CartList",cartList)
        cartList.map(async(item)=>{
            await addDoc(individualOrderCollection,{
                Item:item.title,
                OrderID:orderID,
                Price:item.price,
                Quantity:item.quantity
            })
            
        })
        
        setSendingComplete(true)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const {error,paymentMethod} = await stripe.createPaymentMethod(
            {
                type:"card",
                card:elements.getElement(CardElement)
            }
        )
        if(!error)
    {
        try{
            const {id} = paymentMethod
            // const response = await 
            setSuccess(true)
            await sendOrderData(id)
            let listOfIds = []
            cartList.map((item)=>{
            listOfIds.push(item.id)
            })
            dispatch(clearFromCart(listOfIds))
            dispatch(clearCart())
            
            
        }
        catch(error)
        {
            console.log(error)
        }
    }else{
        console.log(error.message)
    }
    }

    


  return (
    <>
    {/* <h2 className='text-center text-xl font-semibold'>Email: {auth?.currentUser?.email}</h2> */}
        {!success?
        
            <div className='ml-[35%] mt-[10%] '>
                <div className='max-w-md'>
                <form onSubmit={handleSubmit}>
                
                <fieldset className=' '>
                    <div className='bg-black text-white rounded-sm px-2'>
                        <CardElement options={CARD_OPTIONS}></CardElement>
                    </div>
    
                </fieldset>
                <div className='flex justify-center mt-[10%]'>
                <button className='rounded-none px-4 py-2 bg-green-500 text-white font-bold'>Pay ₹{total}</button>

                </div>
            </form>
                </div>
           
            </div>
           
        
        
        :
        <div className='flex flex-col gap-4  justify-center mt-[15%]'>
           
            <h2 className='text-2xl text-center font-bold'>Payment successful! Do shop again!! </h2>
 
          
            <div className='flex justify-center'>
                <Link to="/dashboard">
                <button className='rounded-sm bg-black font-bold text-white px-4 py-2'>Go home</button>

                </Link>
            </div>
        </div>
        }
    </>
  )
}

export default PaymentForm