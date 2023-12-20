import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './StorePage.css'
import Product from '../../components/Product/Product';
import AddProduct from '../../components/AddProduct/AddProduct';

function StorePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [storeData, setStoreData] = useState();
  const [storeAuthId, setStoreAuthId] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [storesList, setStoresList] = useState([]);
  const [addProductDisplay, setAddProductDisplay] = useState(false)
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
        setStoreAuthId(storesList[i].id);
        break;
      }
    }
  }, [storesList])

  async function updateProductList(storeAuthId, newlist) {
    console.log('hi from updateProductList ')
    const StoreDoc = doc(db, "Stores", storeAuthId);
    console.log(newlist);
    await updateDoc(StoreDoc, { products: newlist });
  };

  function handleAddProduct(newProduct, storeAuthId) {
    console.log(newProduct);
    console.log(storeAuthId);
    const newlist = [...productsList, newProduct];
    console.log(newlist);

    setProductsList(newlist);
    updateProductList(storeAuthId, newlist);
  }

  return (
    <div className='Store-page-container page'>
      <div>
        <div className='btn-container'>
          <button onClick={() => {
            setAddProductDisplay(true);
          }}>Add Product</button>
          <button onClick={() => {
            navigate('/StoreOrders');
          }}>Orders</button>
          <button>Delivery</button>
        </div>
        <div>
          {addProductDisplay && <AddProduct
            handleClose={setAddProductDisplay}
            handleAddProduct={handleAddProduct}
            storeAuthId={storeAuthId}
          />}

          {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
        </div>
      </div>
      <h2>Our Products</h2>
      <div className='products-container'>
        {
          productsList.map((p, index) => {
            return <Product
              key={index}
              name={p.name}
              price={p.price}
              imgUrl={p.imgUrl}
              quantity={p.quantity}
              unit={p.unit}
            // handleChange={() => handleChange(index)}
            />
          })
        }
      </div>
    </div >
  )
}

export default StorePage