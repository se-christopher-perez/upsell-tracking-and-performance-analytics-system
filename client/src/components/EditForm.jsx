
import { React } from "react";


function EditForm({ editedTotal, setEditedTotal, editedTip, setEditedTip, editedItemName, 
    setEditedItemName, editedCategory, setEditedCategory, editedPrice, setEditedPrice, 
    editedQuantity, setEditedQuantity, editedTerms, updateTermText, foodTerms, handleCancel }) {

    return (

        <>

            <div className="main-billcard-container">

                <label htmlFor="edit-total">Total: </label>

                <input id="edit-total" type="number" value={editedTotal} onChange={(e) => setEditedTotal(e.target.value)} />

                <label htmlFor="edit-tip">Tip: </label>

                <input id="edit-tip" type="number" value={editedTip} onChange={(e) => setEditedTip(e.target.value)} />

                <label htmlFor="edit-item-name">Item Name: </label>

                <input id="edit-item-name" type="text" value={editedItemName} onChange={(e) => setEditedItemName(e.target.value)} />

                <label htmlFor="edit-category">Category: </label>

                <input id="edit-category" type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} />

                <label htmlFor="edit-price">Price: </label>

                <input id="edit-price" type="number" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />

                <label htmlFor="edit-quantity">Quantity: </label>

                <input id="edit-quantity" type="number" value={editedQuantity} onChange={(e) => setEditedQuantity(e.target.value)} />

                <p>Terms:</p>

                {editedTerms.map((term, index) => (
                    <select key={term.id} value={term.term} onChange={(e) => updateTermText(index, e.target.value)}>

                        {foodTerms.map((foodTerm) => (

                            <option key={foodTerm} value={foodTerm}>{foodTerm}</option>

                        ))}

                    </select>

                ))}

            </div>

        </>

    )

}

export default EditForm