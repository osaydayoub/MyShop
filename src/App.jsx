import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import SignUp from './components/SignUp'
import { useAuth } from './context/AuthContext'
import StorePage from './pages/StorePage/StorePage'
import DeliveryOrders from './components/DeliveryOrders'

function App() {
  const { currentUser } = useAuth();

  return (
    <>
      <Routes>
        <Route exact path='/'
          element={
            currentUser ? (<Homepage />) : (<Navigate replace to={'/login'} />)
          } />
        {/* <Route path='/' exact element={<Homepage />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/DeliveryOrders' element={<DeliveryOrders />} />
        {/* '/DeliveryOrders' */}

      </Routes>



    </>
  )
}

export default App
