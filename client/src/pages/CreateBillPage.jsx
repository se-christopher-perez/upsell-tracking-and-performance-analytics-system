
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

  const [terms, setTerms] = useState([])

  function toggleTerm(term) {

    if (terms.includes(term)) {

      setTerms(terms.filter((t) => {

        return t !== term

      }))

    } else {

      setTerms([...terms, term])

    }

  }

  return (

    <>

      <div className="main-createbill-container">

        <p>Create bill Page</p>

        <div className="tip-container">

          <label htmlFor="tip-input">Tip: </label>

          <input id="tip-input" type="text" value={tip} onChange={(e) => setTip(e.target.value)} />

        </div>

        <div className="item-container">

          <h3>Item</h3>

          <div className="item-name-container">

            <label htmlFor="item-name">Item: </label>

            <select id="item-name" value={itemName} onChange={(e) => setItemName(e.target.value)}          >
              <option value="">Select item</option>
              <option value="cheeseburger">cheeseburger</option>
              <option value="ribeye">ribeye</option>
              <option value="buffalo wings">buffalo wings</option>
              <option value="margarita">margarita</option>
              <option value="martini">martini</option>
            </select>

          </div>

          <div className="item-category-container">

            <label htmlFor="item-category">Category: </label>

            <select id="item-category" value={category} onChange={(e) => setCategory(e.target.value)} >
              <option value="">Select category</option>
              <option value="beverage">beverage</option>
              <option value="food">food</option>
            </select>

          </div>

          <div className="item-price-container">

            <label htmlFor="item-price">Price: </label>

            <input id="item-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

          </div>

          <div className="item-quantity-container">

            <label htmlFor="item-quantity">Quantity: </label>

            <input id="item-quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          </div>

        </div>

      </div>

    </>

  )

}

export default CreateBill