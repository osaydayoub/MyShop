import React from 'react'
import { useAuth } from '../../context/AuthContext'
function StorePage() {
  const { currentUser, getStoreData } = useAuth()

  return (
    <>
      <h1>{currentUser.displayName}</h1>
      <button>Orders</button>
      <button>Our Products</button>
      <button>Delivery</button>
    </>
  )
}

export default StorePage