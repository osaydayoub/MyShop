import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CustomerPage from '../CustomerPage/CustomerPage';
import DeliveryPage from '../DeliveryPage/DeliveryPage';
import StorePage from '../StorePage/StorePage';
const [Customer, Store, Delivery] = ['Customer', 'Store', 'Delivery'];

function Homepage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [userType, setuserType] = useState('');
  const usersCollectionRef = collection(db, 'users')


  async function getUsersList() {
    try {
      const data = await getDocs(usersCollectionRef)
      const userslist = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsersList(userslist);
    } catch (err) {
      console.log(err);
    }
    // console.log(usersList)
    console.log(currentUser)
  }

  useEffect(() => {
    getUsersList();
  }, [])

  useEffect(() => {
    console.log(usersList)
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].userAuthId === currentUser.uid) {
        setuserType(usersList[i].userType);
        console.log(usersList[i].userType);
        return;
      }
    }
  }, [usersList])

  async function handleLogout() {
    try {
      await logout();
      navigate('./login')
    } catch {
      console.log('failed to log out')
    }
  }


  return (
    <>
      {userType &&
        <div>
          <button onClick={handleLogout}>Log Out</button>
          <h1>Homepage</h1>
          {userType === Customer && <CustomerPage />}
          {userType === Store && <StorePage />}
          {userType === Delivery && <DeliveryPage />}

          <h2>displayName:{currentUser.displayName}</h2>
          <h2>Email:{currentUser.email}</h2>

        </div>}
    </>
  )
}

export default Homepage