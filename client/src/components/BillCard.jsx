

import { React, useState } from "react";
import ItemCard from "./ItemCard";
import EditForm from "./EditForm";


function BillCard({ bill, onDelete, onUpdate }) {

    const [deleted, setDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [error, setError] = useState(null)

    const [editedTotal, setEditedTotal] = useState(bill.total)
    const [editedTip, setEditedTip] = useState(bill.tip)

    function handleDelete() {

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

    function handleCancel() {

        setEditedTotal(bill.total)

        setEditedTip(bill.tip)

        setIsEditing(false)

    }

    function handleSave() {

        const updated_bill = {

            total: editedTotal,
            tip: editedTip

        }

        fetch(`http://localhost:5556/bills/${bill.id}`, {

            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(updated_bill)

        })
            .then((r) => {

                return r.json().then((data) => ({ ok: r.ok, data }))

            })
            .then(({ ok, data }) => {

                if (ok) {

                    onUpdate(data)

                    setIsEditing(false)

                } else {

                    setError(data.error)

                }

            })
            .catch((err) => {

                setError(err.message)

            })

    }

    if (deleted) {

        return <p><b>Deleted</b></p>

    }

    if (isEditing) {

        return (

            <>

                <div className="main-billcard-container">

                    <h3>Editing Bill #{bill.id}</h3>

                    <EditForm bill={bill} editedTip={editedTip} setEditedTip={setEditedTip} editedTotal={editedTotal} setEditedTotal={setEditedTotal} />

                    <button onClick={() => handleSave()}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>

                </div>

            </>

        )

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

            <div className="button-container">

                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>

            </div>

        </>

    )

}

export default BillCard