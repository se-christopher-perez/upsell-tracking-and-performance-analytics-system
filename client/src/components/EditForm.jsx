
import { React } from "react";


function EditForm({ bill, handleCancel, editedTotal, setEditedTotal, editedTip, setEditedTip }) {

    return (

        <>

            <div className="main-billcard-container">

                <label htmlFor="edit-total">Total: </label>

                <input id="edit-total" type="number" value={editedTotal} onChange={(e) => setEditedTotal(e.target.value)} />

                <label htmlFor="edit-tip">Tip: </label>

                <input id="edit-tip" type="number" value={editedTip} onChange={(e) => setEditedTip(e.target.value)} />

            </div>

        </>

    )

}

export default EditForm