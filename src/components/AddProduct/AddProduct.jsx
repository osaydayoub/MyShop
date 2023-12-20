import React, { useState } from 'react'
import { FaRegWindowClose } from "react-icons/fa";

function AddProduct({ handleClose, handleAddProduct, storeAuthId }) {
    const [productName, setProductName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState(0);
    function handleSubmit(e) {
        e.preventDefault();
        handleAddProduct({
            imgUrl: imgUrl,
            name: productName,
            price: price,
            quantity: quantity,
            unit: unit
        }, storeAuthId);
    }

    return (

        <div className='add-form-container'>
            <button type='submit' onClick={() => handleClose(false)}><FaRegWindowClose /></button>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name</label><br />
                    <input
                        type="text"
                        id='name'
                        onChange={(e) => setProductName(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="ImgUrl">ImgUrl</label><br />
                    <input
                        type="text"
                        id='ImgUrl'
                        onChange={(e) => setImgUrl(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="price">Price</label><br />
                    <input
                        type='number'
                        id='price'
                        onChange={(e) => setPrice(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label><br />
                    <input
                        type='number'
                        id='quantity'
                        onChange={(e) => setQuantity(e.target.value)}
                        required />
                </div>

                <div>
                    <label htmlFor="unit">Unit</label><br />
                    <input
                        type="text"
                        id='unit'
                        onChange={(e) => setUnit(e.target.value)}
                        required />
                </div>

                <div>
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct