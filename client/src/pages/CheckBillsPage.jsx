
import { React, useState, useEffect } from "react";
import BillCard from "../components/BillCard";


function CheckBill() {

  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetch("http://localhost:5556/bills", {

      headers: { "Content-Type": "application/json" },
      credentials: "include"

    })
      .then((r) => {

        return r.json()

      })
      .then((data) => {

        setBills(data)

      })
      .catch((err) => {

        console.log(err.message)

      })
      .finally(() => {

        setLoading(false)

      })

  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (

    <>

      <div className="main-checkbill-container">

        <h2>Check Bills</h2>

        <div className="billcard-container">

          {bills.map((bill) => {

            return <BillCard key={bill.id} bill={bill} />

          })}

        </div>

      </div>

    </>

  )

}

export default CheckBill