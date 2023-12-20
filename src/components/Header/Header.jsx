import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GrLogout } from "react-icons/gr";

function Header() {
    const {currentUser,  logout } = useAuth()
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
        <div className='Header'>
            <h1>Store More +</h1>
            <h1>{currentUser.displayName}</h1>
            <button onClick={handleLogout}>Log Out <GrLogout /></button>
            {/* <button onClick={handleLogout}>Log Out</button> */}
            
        </div>
    )
}

export default Header