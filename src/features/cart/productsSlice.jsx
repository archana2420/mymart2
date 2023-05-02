import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { useDispatch } from "react-redux"




const url = 'https://fakestoreapi.com/products'

const initialState = {
    products:[],
    isLoading:false,
}

export const getProducts = createAsyncThunk('features/product',async(thunkAPI)=>{
    return axios.get(url).then((res)=>{
        return res.data
    }).catch((error)=> console.log(error))
})

const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        hideAddToCart:(state,action)=>{
            const cartItem = state.products.find((item)=>item.id===action.payload)
            cartItem.isHidden = true
            console.log(cartItem.isHidden)
        },
        displayAddToCart:(state,action)=>{
            const cartItem = state.products.find((item)=>item.id===action.payload)
            cartItem.isHidden = false
        },
        increase:(state,action)=>{
            const cartItem = state.products.find((item)=>item.id===action.payload)
            cartItem.quantity += 1
        },
        decrease:(state,action)=>{
            
            const cartItem = state.products.find((item)=>item.id===action.payload)
            if(cartItem.quantity>=1)
            {
                cartItem.quantity -= 1
            }
            
            
        },
        clearFromCart:(state,action)=>{
            for(let id=0;id<action.payload.length;id++)
            {
                const cartItem = state.products.find((item)=>item.id==action.payload[id])
                cartItem.isHidden = false
                cartItem.quantity = 0
            }
        }
    },
    extraReducers:{
        [getProducts.pending]:(state)=>{
            state.isLoading = true 
        },
        [getProducts.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.products = action.payload
            for(let item in state.products)
            {
                state.products[item]["quantity"] = 0
                state.products[item]["isHidden"] = false
            }
            
        }
    }
})

export const {increase,decrease,hideAddToCart,displayAddToCart,clearFromCart} = productsSlice.actions

export default productsSlice.reducer