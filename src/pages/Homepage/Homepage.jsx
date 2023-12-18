import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


function Homepage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('./login')
    } catch {
      console.log('failed to log out')
    }
  }


  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
      {/* <button onClick={handleUpdateUser}>updateUser</button> */}
      <h1>Homepage</h1>

      <h2>displayName:{currentUser.displayName}</h2>
      <h2>Email:{currentUser.email}</h2>


    </div>
  )
}

export default Homepage