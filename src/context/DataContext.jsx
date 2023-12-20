import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';


export const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [currentStoreData, setCurrentStoreData] = useState();
    const [productsList, setProductsList] = useState([]);
    const [storesList, setStoresList] = useState([]);

    const storesCollectionRef = collection(db, 'Stores');

    async function getStorseList() {
        try {
            const data = await getDocs(storesCollectionRef)
            const storeslist = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setStoresList(storeslist);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getStorseList();
    }, [userType])

    useEffect(() => {
        for (let i = 0; i < storesList.length; i++) {
            if (storesList[i].authId === currentUser.uid) {
                setCurrentStoreData(storesList[i]);
                setProductsList(storesList[i].products)
                break;
            }
        }
    }, [storesList])

    const value = {
        currentStoreData,
        storesList,
        productsList,
        // getStores,
        // getProducts,
        // logout,
        // updateUser
    }
    return (
        //add loading spinner
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}