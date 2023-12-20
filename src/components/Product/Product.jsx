import React from 'react'
import './Product.css'
function Product(data) {
  return (
    <div className='product-container'>
        <img src={data.imgUrl} alt="img" />

        <h1>{data.name}</h1>
        <div>
        <p>{`price ${data.price}₪`}</p>

        <p>{ `quantity ${data.quantity} ${data.unit}`}</p>
        </div>
    </div>
  )
}

export default Product