import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './StorePage.css'
import StoreProducts from '../../components/StoreProducts';



function StorePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth()
  const { storeData, setstoreData } = useState();

  return (
    <div className='Store-page-container page'>
      {/* <h1>{currentUser.displayName}</h1> */}
      <div>
        <h2>Our Products</h2>
        <div className='products-container'>
          <StoreProducts/>

        </div>
      <button onClick={() => {
        navigate('/StoreProducts');
      }}>update & add Products</button>

      </div>

      {/* <button>add Product</button> */}
      
      <button onClick={() => {
        navigate('/StoreOrders');
      }}>Orders</button>

      <button>Delivery</button>
    </div>
  )
}

export default StorePage