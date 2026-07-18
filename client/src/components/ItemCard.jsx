

import { React } from "react";
import InteractionCard from "./InteractionCard";


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

                <div className="main-interaction-container">

                    {item.interactions.map((interaction) => {

                        return <InteractionCard key={interaction.id} interaction={interaction}/>

                    })}

                </div>
                
            </div>

        </>

    )

}

export default ItemCard