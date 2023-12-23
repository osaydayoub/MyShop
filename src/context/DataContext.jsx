import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';



export const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [Customer, Store, Delivery] = ['Customer', 'Store', 'Delivery'];
    const { currentUser } = useAuth();
    const [usersList, setUsersList] = useState([]);
    const [currentUserType, setCurrentUserType] = useState("");

    const [currentStoreData, setCurrentStoreData] = useState();
    const [CurrentStoreAuthId, setCurrentStoreAuthId] = useState("");
    const [productsList, setProductsList] = useState([]);
    const [storesList, setStoresList] = useState([]);

    const storesCollectionRef = collection(db, 'Stores');
    const usersCollectionRef = collection(db, 'users');

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
    }

    useEffect(() => {
        getUsersList();
    }, [])

   
    useEffect(() => {
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].userAuthId === currentUser?.uid) {
                setCurrentUserType(usersList[i].userType);
                return;
            }
        }
    }, [usersList,currentUser])

    useEffect(() => {
        if (currentUserType === Store) {
            const storesListForSave = [];
            async function getStorseList() {
                try {
                    const data = await getDocs(storesCollectionRef)
                    const newStoreslist = data.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    storesListForSave = newStoreslist;
                    setStoresList(newStoreslist);
                } catch (err) {
                    console.log(err);
                }
            }
            getStorseList();
            for (let i = 0; i < storesListForSave.length; i++) {
                if (storesListForSave[i].authId === currentUser?.uid) {
                    setCurrentStoreData(storesListForSave[i]);
                    setProductsList(storesListForSave[i].products)
                    setCurrentStoreAuthId(storesListForSave[i].id);
                    break;
                }
            }
        }

    }, [currentUserType])


    async function updateProductList(storeAuthId, newlist) {
        console.log('hi from updateProductList ')
        const StoreDoc = doc(db, "Stores", storeAuthId);
        console.log(newlist);
        await updateDoc(StoreDoc, { products: newlist });
    };

    function handleAddProduct(newProduct, storeAuthId) {
        const newlist = [...productsList, newProduct];
        setProductsList(newlist);
        updateProductList(storeAuthId, newlist);
    }

    const value = {
        currentUserType,
        setCurrentUserType,
        currentStoreData,
        storesList,
        productsList,
        handleAddProduct,
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