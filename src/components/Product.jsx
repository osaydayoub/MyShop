import React from 'react'

function Product(data) {
  return (
    <div>
        <h1>{data.name}</h1>
        <h2>{data.price}</h2>
        <img src={data.imgUrl} alt="img" />
    </div>
  )
}

export default Product