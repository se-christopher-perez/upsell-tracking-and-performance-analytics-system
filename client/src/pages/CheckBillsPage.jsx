
import { React, useState, useEffect } from "react";
import BillCard from "../components/BillCard";


function CheckBill() {

  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {

    fetch(`http://localhost:5556/bills?page=${page}&per_page=2`, {

      headers: { "Content-Type": "application/json" },
      credentials: "include"

    })
      .then((r) => {

        return r.json()

      })
      .then((data) => {

        setBills(data.bills)

        setTotalPages(data.total_pages)

      })
      .catch((err) => {

        console.log(err.message)

      })
      .finally(() => {

        setLoading(false)

      })

  }, [page])

  function handleBillDelete(id) {

    console.log("handleBillDelete called with id:", id)

    fetch(`http://localhost:5556/bills?page=${page}&per_page=2`, {

      headers: { "Content-Type": "application/json" },
      credentials: "include"

    })
      .then((r) => {

        return r.json()

      })
      .then((data) => {

        console.log("Refetched data:", data)

        if (data.bills.length === 0 && page > 1) {

          setPage(page - 1)

        } else {

          setBills(data.bills)

          setTotalPages(data.total_pages)

        }

      })
      .catch((err) => {

        console.log(err.message)

      })

  }

  function handleBillUpdate(updatedBill) {

    setBills((prevBills) => prevBills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill)))

  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (

    <>

      <div className="main-checkbill-container">

        <h2>Check Bills</h2>

        <div className="billcard-container">

          {bills.map((bill) => {

            return <BillCard key={bill.id} bill={bill} onDelete={handleBillDelete} onUpdate={handleBillUpdate} />

          })}

        </div>

        <br />

        <div className="pagination-controls-container">

          <button disabled={page === 1} onClick={() => setPage(page - 1)}>{page === 1 ? "Page 0" : page === totalPages ? `Page ${page - 1}` : `Page ${page}`}</button>

          <span> {page} of {totalPages} </span>

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>{page === totalPages ? "End" : `Page ${page + 1}`}</button>

        </div>

      </div>

    </>

  )

}

export default CheckBill