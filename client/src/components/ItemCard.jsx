

import { React } from "react";


function ItemCard({ item }) {

    return (

        <>

            <div className="item-card-container">

                <div className="item-block-container">

                    <p><b>Item</b></p>
                    <p>{item.item_name}     x{item.quantity}     ${item.price}</p>

                </div>

                <div className="category-container">

                    <p>Category: {item.category}</p>

                </div>

            </div>

        </>

    )

}

export default ItemCard