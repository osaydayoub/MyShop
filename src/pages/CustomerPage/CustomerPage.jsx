import React from 'react'
import { useAuth } from '../../context/AuthContext'
function CustomerPage() {
  const { currentUser, getCustomerData } = useAuth()
  return (
    <>
      <h1>{currentUser.displayName}</h1>
      <button>My Orders</button>
      <button>My Stores</button>
      {/* <button>Delivery</button> */}

    </>

  )

}

export default CustomerPage