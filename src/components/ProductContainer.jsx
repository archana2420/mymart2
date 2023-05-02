import React, { useEffect, useState } from 'react'
import Product from './Product'
import { useSelector } from 'react-redux'
import Pagination from './Pagination'
import {auth} from "../config/firebaseConfig"




const ProductContainer = () => {
    const {products,isLoading} = useSelector((store)=>store.products)
    const {cartList} = useSelector((store)=>store.cart)
    const [currentPage,setCurrentPage] = useState(1)
    useEffect(()=>{

    },[cartList])
    if(isLoading){
        return <div className='flex gap-4 justify-center items-center my-4 w-full h-full'>
                <div className='animate-spin w-10 h-10 rounded-full border-4 border-[ #f3f3f3] border-t-4 border-t-[black]'></div>
                <h2 className='text-4xl font-bold '>Loading..</h2>
        </div>
    }

    // console.log(auth?.currentUser?.uid)
    const pageSize = 6

    const onPageChange = (page)=>{
      setCurrentPage(page)
    }
    const startIndex = (currentPage-1) * pageSize
    const slicedProducts = products.slice(startIndex,startIndex+pageSize)

   
  return (
    <div className='flex flex-col h-full '>
      
     <h1 className='text-2xl font-bold text-center'>Welcome {auth?.currentUser?.displayName}!!</h1>
      <div className='flex flex-wrap  justify-center gap-4  my-4 '>
      {slicedProducts.map((product)=>{
            return <Product key={product.id} {...product}></Product>
        })}
      </div>
       <div className='my-5'>
       <Pagination
        items={products.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}

        ></Pagination>
       </div>
       
    </div>
  )
}

export default ProductContainer