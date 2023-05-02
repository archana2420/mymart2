import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isOpen:false
}

const clearCartModalSlice = createSlice({
    name:"clearCartModalToggle",
    initialState,
    reducers:{
        closeClearCartModal:(state)=>{
            state.isOpen = false
        },
        displayClearCartModal:(state)=>{
            state.isOpen = true
        }

    }
})

export const {closeClearCartModal,displayClearCartModal} = clearCartModalSlice.actions


export default clearCartModalSlice.reducer
