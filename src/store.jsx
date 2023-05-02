import {configureStore} from "@reduxjs/toolkit"
import productsReducer from "./features/cart/productsSlice"
import cartReducer from "./features/cart/cartSlice"
import clearCartModalReducer from "./features/cart/clearCartModalSlice"



export const store = configureStore({
    reducer:{
        products:productsReducer,
        cart:cartReducer,
        clearCartModalToggle:clearCartModalReducer
        
    }
})