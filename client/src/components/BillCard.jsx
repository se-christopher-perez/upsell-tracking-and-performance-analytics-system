

import { React, useState } from "react";
import ItemCard from "./ItemCard";
import EditForm from "./EditForm";


function BillCard({ bill, onDelete, onUpdate }) {

    const [deleted, setDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [error, setError] = useState(null)

    const [editedTotal, setEditedTotal] = useState(bill.total)
    const [editedTip, setEditedTip] = useState(bill.tip)

    const [editedItemName, setEditedItemName] = useState(bill.items[0].item_name)
    const [editedCategory, setEditedCategory] = useState(bill.items[0].category)
    const [editedPrice, setEditedPrice] = useState(bill.items[0].price)
    const [editedQuantity, setEditedQuantity] = useState(bill.items[0].quantity)

    const interaction = bill.items[0].interactions[0]

    const [editedApproach, setEditedApproach] = useState(interaction.approach)
    const [editedGender, setEditedGender] = useState(interaction.customer_gender)
    const [editedUpsell, setEditedUpsell] = useState(interaction.upsell)
    const [editedCarded, setEditedCarded] = useState(interaction.customer_carded)
    const [editedRepeat, setEditedRepeat] = useState(interaction.customer_repeat)
    const [editedFeedback, setEditedFeedback] = useState(interaction.feedback)

    const [editedTerms, setEditedTerms] = useState(

        interaction.terms.map((term) => ({ id: term.id, term: term.term }))

    )

    const foodTerms = ["spicy", "juicy", "savory", "sweet", "tangy", "zesty", "crisp", "tart", "smoky", "creamy", "fresh", "buttery"]

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
            tip: editedTip,
            items: [

                {

                    id: bill.items[0].id,
                    item_name: editedItemName,
                    category: editedCategory,
                    price: editedPrice,
                    quantity: editedQuantity,
                    interactions: [

                        {

                            id: interaction.id,
                            approach: editedApproach,
                            customer_gender: editedGender,
                            upsell: editedUpsell,
                            customer_carded: editedCarded,
                            customer_repeat: editedRepeat,
                            feedback: editedFeedback,
                            terms: editedTerms.map((t) => ({ id: t.id, term: t.term }))

                        },

                    ],

                },

            ],

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

    function updateTermText(index, newTerm) {

        const updated = [...editedTerms]

        updated[index] = { ...updated[index], term: newTerm }

        setEditedTerms(updated)

    }

    if (deleted) {

        return <p><b>Deleted</b></p>

    }

    if (isEditing) {

        return (

            <>

                <div className="main-billcard-container">

                    <h3>Editing Bill #{bill.id}</h3>

                    <EditForm
                        editedTotal={editedTotal} setEditedTotal={setEditedTotal}
                        editedTip={editedTip} setEditedTip={setEditedTip}
                        editedItemName={editedItemName} setEditedItemName={setEditedItemName}
                        editedCategory={editedCategory} setEditedCategory={setEditedCategory}
                        editedPrice={editedPrice} setEditedPrice={setEditedPrice}
                        editedQuantity={editedQuantity} setEditedQuantity={setEditedQuantity}
                        editedTerms={editedTerms}
                        updateTermText={updateTermText}
                        foodTerms={foodTerms}
                        handleCancel={handleCancel}
                    />

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