import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import SignUp from './components/SignUp'
import { useAuth } from './context/AuthContext'
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
      </Routes>



    </>
  )
}

export default App
