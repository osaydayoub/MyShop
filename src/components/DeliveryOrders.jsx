import React from 'react'
import { useNavigate } from "react-router-dom";

function DeliveryOrders() {
    const navigate = useNavigate();

    return (
        <>
            <div>DeliveryOrders</div>
            <button onClick={() => {
                navigate(-1);
            }}>Back</button>
        </>


    )
}

export default DeliveryOrders