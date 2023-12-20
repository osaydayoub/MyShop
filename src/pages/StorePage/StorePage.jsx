import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';



function StorePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth()
  const { storeData, setstoreData } = useState();

  return (
    <>
      <h1>{currentUser.displayName}</h1>
      <button onClick={() => {
        navigate('/StoreProducts');
      }}>Our Products</button>
      {/* <button>add Product</button> */}
      
      <button onClick={() => {
        navigate('/StoreOrders');
      }}>Orders</button>

      <button>Delivery</button>
    </>
  )
}

export default StorePage