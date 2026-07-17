
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

        <div className="interactaction-container">

          <h3>Interaction</h3>

          <div className="interactaction-approach-container">

            <label htmlFor="interactaction-approach">Approach: </label>

            <select id="interactaction-approach" value={approach} onChange={(e) => setApproach(e.target.value)} >
              <option value="">Select approach</option>
              <option value="friendly">friendly</option>
              <option value="casual">casual</option>
              <option value="robotic">robotic</option>
              <option value="scripted">scripted</option>
              <option value="humor">humor</option>
              <option value="honesty">honesty</option>
            </select>

          </div>

          <div className="interaction-customer-gender-container">

            <label htmlFor="interactaction-customer-gender">Customer Gender: </label>

            <select id="interactaction-customer-gender" value={customerGender} onChange={(e) => setCustomerGender(e.target.value)}   >
              <option value="">Select gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>

          </div>

          <div className="interactions-checks-container">

            <label htmlFor="interactaction-upsell">Upsell? </label>

            <input id="interactaction-upsell" type="checkbox" checked={upsell} onChange={(e) => setUpsell(e.target.checked)} />

            <label htmlFor="interactaction-customer-carded">Carded? </label>

            <input id="interactaction-customer-carded" type="checkbox" checked={customerCarded} onChange={(e) => setCustomerCarded(e.target.checked)} />

            <label htmlFor="interactaction-customer-repeat">Repeat Customer? </label>

            <input id="interactaction-customer-repeat" type="checkbox" checked={customerRepeat} onChange={(e) => setCustomerRepeat(e.target.checked)} />

          </div>

          <div className="interactaction-feedback-container">

            <label htmlFor="interactaction-feedback">Feedback: </label>

            <input id="interactaction-feedback" type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} />

          </div>



        </div>

        <div className="tip-container">

          <h3>Tip</h3>

          <label htmlFor="tip-input">Tip: </label>

          <input id="tip-input" type="text" value={tip} onChange={(e) => setTip(e.target.value)} />

        </div>

        <div className="terms-container">

          <h3>Terms</h3>

          <div className="terms-list-containers">

            <p className={terms.includes("spicy") ? "term-selected" : "term-deselected"} onClick={() => toggleTerm("spicy")}>Spicy</p>

            <p className={terms.includes("juicy") ? "term-selected" : "term-deselected"} onClick={() => toggleTerm("juicy")}>Juicy</p>

            <p className={terms.includes("savory") ? "term-selected" : "term-deselected"} onClick={() => toggleTerm("savory")}>Savory</p>

            <p className={terms.includes("sweet") ? "term-selected" : "term-deselected"} onClick={() => toggleTerm("sweet")}>Sweet</p>

          </div>

        </div>

      </div>

    </>

  )

}

export default CreateBill