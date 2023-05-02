import {createSlice,current} from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { clearFromCart } from "./productsSlice"


const initialState={
    cartList:[],
    total:0,
    isLoading:false,
    no_of_items:0,
   
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addtocart:(state,action)=>{
           
            state.cartList = [...state.cartList,action.payload]
            state.no_of_items += 1
            // console.log(state.cartList)
        },
        increaseQuantity:(state,action)=>{
            const cartItem = state.cartList.find((item)=>item.id===action.payload)
            cartItem.quantity += 1
            console.log(current(cartItem))
            // console.log(state.cartList)

        },
        decreaseQuantity:(state,action)=>{
            const cartItem = state.cartList.find((item)=>item.id===action.payload)
            if(cartItem.quantity===1)
            {
                state.cartList = state.cartList.filter((item)=>item.id!==cartItem.id)
            }
            else{
                cartItem.quantity -= 1
            }
            
        },
        calculateTotal:(state)=>{
            state.total = 0
            state.cartList.map((item)=>{
                state.total += (item.price * item.quantity)
            })
            state.total = state.total.toFixed(2)
        },
        calculateNoOfItems:(state)=>{
            state.no_of_items = state.cartList.length
        },
        clearCart:(state)=>{
            // const dispatch = useDispatch()
            // let listOfIds = []
            // state.cartList.map((item)=>{
            //     listOfIds.push(item.id)
            // })
            // dispatch(clearFromCart(listOfIds))
            state.cartList = []
        },
        removeFromCart:(state,action)=>{
            const cartItem = state.cartList.find((item)=>item.id===action.payload)
            state.cartList = state.cartList.filter((item)=>item.id!==cartItem.id)
            
        } 

    }
})

export const {addtocart,increaseQuantity,decreaseQuantity,calculateTotal,calculateNoOfItems,clearCart,removeFromCart} = cartSlice.actions

export default cartSlice.reducer