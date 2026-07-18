

import { React } from "react";
import InteractionCard from "./InteractionCard";


function ItemCard({ item }) {

    return (

        <>

            <div className="item-card-container">

                <h3>Item: </h3>

                <div className="category-container">

                    <p><b>Category:</b> {item.category}</p>

                </div>

                <div className="item-block-container">

                    <br />

                    <p><b>{item.item_name}</b>     x{item.quantity}     ${item.price}</p>

                    <br />

                </div>

                <div className="main-interaction-container">

                    {item.interactions.map((interaction) => {

                        return <InteractionCard key={interaction.id} interaction={interaction} />

                    })}

                </div>

            </div>

        </>

    )

}

export default ItemCard