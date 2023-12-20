import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
// import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CustomerPage from '../CustomerPage/CustomerPage';
import DeliveryPage from '../DeliveryPage/DeliveryPage';
import StorePage from '../StorePage/StorePage';
import Header from '../../components/Header/Header';
const [Customer, Store, Delivery] = ['Customer', 'Store', 'Delivery'];

function Homepage() {
  const { currentUser } = useAuth()
  // const navigate = useNavigate();
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

  return (
    <>
      <Header />
      {userType &&
        <div className='page'>

          {!userType && <h1>wating for data</h1>}
          {/* <h1>Homepage</h1> */}
          {userType === Customer && <CustomerPage />}
          {userType === Store && <StorePage />}
          {userType === Delivery && <DeliveryPage />}

        </div>}
    </>
  )
}

export default Homepage