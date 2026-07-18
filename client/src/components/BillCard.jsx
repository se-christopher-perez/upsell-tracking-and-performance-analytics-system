

import { React, useState } from "react";
import ItemCard from "./ItemCard";


function BillCard({ bill, onDelete }) {

    const [deleted, setDeleted] = useState(false)

    function handleDelete(){

        fetch(`http://localhost:5556/bills/${bill.id}`, {

            method: "DELETE",
            credentials: "include"

        })
        .then((r) => {

            if (r.ok) {

                setDeleted(true)

                setTimeout(() => {

                    onDelete(bill.id)

                }, 3000)

            }

        })
        .catch((err) => {

            console.log(err.message)

        })

    }

    if (deleted) {

        return <p><b>Deleted</b></p>

    }

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

            <div>

                <button>Edit</button>
                <button onClick={handleDelete}>Delete</button>

            </div>

        </>

    )

}

export default BillCard