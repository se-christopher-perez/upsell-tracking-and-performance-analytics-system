

import { React } from "react";
import ItemCard from "./ItemCard";


function BillCard({ bill }) {

    return (

        <>

            <div className="main-billcard-container">

                <div className="billcard-header-container">

                    <div className="bill-number-container">

                        <h3>Bill #{bill.id}</h3>

                    </div>

                    <div className="bill-tips-total-container">

                        <p>Total: {bill.total}</p>

                        <p>Tip: {bill.tip}</p>

                        <p>Date: {bill.created_at}</p>

                    </div>

                </div>

            </div>

            <div className="main-items-container">

                <div className="item-list-container">

                    {bill.items.map((item) => {

                        return <ItemCard key={item.id} item={item} />

                    })}

                </div>

            </div>

        </>

    )

}

export default BillCard