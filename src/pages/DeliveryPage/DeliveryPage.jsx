import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
export default function DeliveryPage() {
  const { currentUser, getDeliveryData } = useAuth();
  const navigate = useNavigate();
  function handleClick(){
    console.log('+_+_+_+_handleClick')
    navigate('/DeliveryOrders')
  }
  return (
    <>
      <h1>{currentUser.displayName}</h1>
      <button onClick={handleClick}>My Orders</button>
      {/* <button>Delivery</button> */}

    </>

  )
}
