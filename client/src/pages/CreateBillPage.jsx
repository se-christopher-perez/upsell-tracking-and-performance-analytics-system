
import { React, useState } from "react";


function CreateBill() {

    const [tip, setTip] = useState(0)
  
    const [itemName, setItemName] = useState("")
    const [category, setCategpry] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)
  
    const [approach, setApproach] = useState("")
    const [customerGender, setCustomerGender] = useState("")
    const [upsell, setUpsell] = useState(false)
    const [customerCarded, setCustomerCarded] = useState(false)
    const [customerRepeat, setCustomerRepeat] = useState(false)
    const [feedback, setFeedback] = useState("")
  

  return (

    <>

      <div className="main-createbill-container">

        <p>Create bill Page</p>

      </div>

    </>

  )

}

export default CreateBill