import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../src/config/firebase';
import { useAuth } from '../context/AuthContext';
import Product from './Product/Product';


function StoreProducts() {
    const { currentUser } = useAuth()
    const [storeData, setStoreData] = useState();
    const [productsList, setProductsList] = useState([]);
    const [storesList, setStoresList] = useState([]);

    const storesCollectionRef = collection(db, 'Stores')
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
    }, [])

    useEffect(() => {
        for (let i = 0; i < storesList.length; i++) {
            if (storesList[i].authId === currentUser.uid) {
                setStoreData(storesList[i]);
                setProductsList(storesList[i].products)
                break;
            }
        }
    }, [storesList])
    return (
        <>
            < >
                {
                    productsList.map((p,index)=>{
                        return <Product 
                        key={index} 
                        name={p.name} 
                        price={p.price} 
                        imgUrl={p.imgUrl} 
                        quantity={p.quantity}
                        unit={p.unit}/>
                    })
                }
            </>

        </>
    )
}

export default StoreProducts