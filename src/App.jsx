import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import ProductContainer from './components/ProductContainer'

import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { getProducts } from './features/cart/productsSlice'
import {BrowserRouter as Router,Routes,Route,Navigate,} from "react-router-dom"
import Cart from './components/Cart'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from "./config/firebaseConfig"
import { calculateNoOfItems } from './features/cart/cartSlice'
import StripeContainer from './components/StripeContainer'
import Auth from './components/Auth'
import Login from './components/Login'
import Orders from './components/Orders'

function App() {
  const dispatch = useDispatch()
  
  const {cartList,no_of_items} = useSelector((state)=>state.cart)
  useEffect(()=>{
    dispatch(getProducts())
  },[])
  useEffect(()=>{
    dispatch(calculateNoOfItems())
  },[cartList])

  return (
    <>
    <Router>
    <Navbar></Navbar>
    <ToastContainer />
    
      <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<ProductContainer></ProductContainer>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/payment' element={
          <StripeContainer/>
        }></Route>
        <Route path='/orders' element={<Orders/>}></Route>
      </Routes>
    
    </Router>
      
    </>
  )
}

export default App
