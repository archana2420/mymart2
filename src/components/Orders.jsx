import React, { useEffect, useState } from 'react'
import {db,auth} from "../config/firebaseConfig"
import {getDocs,collection,query,where,onSnapshot} from "firebase/firestore"

const Orders = () => {

    const orderCollection = query(collection(db,"orders"),where("userID","==",auth?.currentUser?.uid))

    const [orderList,setOrderList] = useState([])
    const [eachOrder,setEachOrder] = useState([])
    const [isLoading,setLoading] = useState(true)
    const [isLoadingOrders,setLoadingOrders] = useState(true)

    const filterData = (data)=>{
        return data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    }
    let orders = []

    useEffect(()=>{
        
        const getOrderData = async()=>{
            try{
                const data = await getDocs(orderCollection)
                const filteredDataOrders = filterData(data)
                console.log(filteredDataOrders)
                // setOrderList(filteredData)
                console.log("Orders",filteredDataOrders)
                let individualOrders = []
                filteredDataOrders.map(async(eachData)=>{
                    const orderData = query(collection(db,"individualOrder"),where("OrderID","==",eachData.id))
                    
                
                    const innerdata = await getDocs(orderData)
                    innerdata.forEach((singleOrder)=>{
                        individualOrders.push({...singleOrder.data(),id:singleOrder.id})
                    })
                    console.log("new",individualOrders)
                    if(orderList.length>0)
                    {
                        setOrderList([orderList,...individualOrders])

                    }
                    else{
                        setOrderList([...individualOrders])
                    }
                    // const filteredData = filterData(innerdata)
                    // console.log("filtered",filteredData)
                   
                    // // setOrderList([orderList,...filteredData])
                    // // individualOrders = [...individualOrders,...filteredData]
                    // filteredData.map((item)=>{
                    //     individualOrders.push(item)
                    //     // setOrderList([...orderList,item])
                    //     // setEachOrder([...eachOrder,item])
                    // })
                //    orders = [...orders,...individualOrders]
                    // console.log(individualOrders)
                    // console.log("indivi",individualOrders)
                    
                })
                
                // setOrderList(individualOrders)
                console.log("orderList",orderList)
                setLoading(false)

            }
            catch(error)
            {
                console.error(error)
            }
        }
        getOrderData()
        // setOrderList(individualOrders)
        // setOrderList(orders)
        console.log("outside",orderList)
    },[])
//    console.log("outside",orderList)
   
   if(isLoading){
    return <div className='flex gap-4 justify-center items-center my-4 w-full h-full'>
            <div className='animate-spin w-10 h-10 rounded-full border-4 border-[ #f3f3f3] border-t-4 border-t-[black]'></div>
            <h2 className='text-4xl font-bold '>Loading..</h2>
    </div>
}

   if(orderList.length!==0)
   {
    return (
        <div className='flex justify-center items-center mt-3'>
            <div className='flex flex-col'>
                <h1 className='text-2xl font-bold text-center'>Orders</h1>
               
                <table className='border-2 border-black mt-6 table-auto'>
                    <thead>
    
                        <tr className='bg-black text-white'>
                            <th className='border-2 border-black px-4 py-2'>Order ID</th>
                            <th className='border-2 border-black px-4 py-2'>Item</th>
                            <th className='border-2 border-black px-4 py-2'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            orderList.map((order)=>{
                                return (
                                    <tr className='hover:bg-gray-100'>
                                  
                                    <td className='border-2 border-black px-2 text-center'>{order.OrderID}</td>
                                    <td className='border-2 border-black px-2 '>{order.Item}</td>
                                    <td className='border-2 border-black px-2 text-center'>₹{order.Price}</td>
                                </tr>
                                )
                           })
                        }
                        
                        {/* <tr>
                            <td className='text-center'>123</td>
                            <td className='text-center'>Bag</td>
                            <td className='text-center'>2300</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
      )
   }
   
    return <div className='flex gap-4 flex-col justify-center items-center my-4 w-full h-full'>
        <h1 className='text-2xl font-bold text-center'>Orders</h1>
           
    <h2 className='text-xl font-bold '>You have not placed any orders yet!!</h2>
</div>
   
  
}

export default Orders