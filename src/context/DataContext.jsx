import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

export const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true);



    useEffect(() => {

    }, [])

    const value = {
        // getStores,
        // getProducts,
        // currentUser,
        // getStores,
        // getProducts,
        // logout,
        // updateUser
    }
    return (
        //add loading spinner
        <DataContext.Provider value={value}>
            {!loading && children}
        </DataContext.Provider>
    )
}