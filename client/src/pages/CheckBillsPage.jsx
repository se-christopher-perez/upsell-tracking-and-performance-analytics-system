
import { React, useState, useEffect } from "react";
import BillCard from "../components/BillCard";

import loadingGif from "../assets/loading.gif"


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

    fetch(`http://localhost:5556/bills?page=${page}&per_page=2`, {

      headers: { "Content-Type": "application/json" },
      credentials: "include"

    })
      .then((r) => {

        return r.json()

      })
      .then((data) => {

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
    return <div className="main-app-container"><img src={loadingGif} alt="Loading..." className="loading-gif" /></div>
  }

  return (

    <>

      <div className="main-checkbill-container">

        <div className="billcard-container">

          {bills.map((bill) => {

            return <BillCard key={bill.id} bill={bill} onDelete={handleBillDelete} onUpdate={handleBillUpdate} />

          })}

        </div>

        <br />

        <div className="pagination-controls-container">

          <button disabled={page === 1} onClick={() => setPage(page - 1)}>{page === 1 ? "Page 0" : `Page ${page - 1}`}</button>

          <span> {page} of {totalPages === 0 ? page : totalPages} </span>

          {totalPages === 0 ? (

            <><button disabled={true} >End</button></>

          ) : (

            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>{page === totalPages ? "End" : `Page ${page + 1}`}</button>

          )}

        </div>

      </div>

    </>

  )

}

export default CheckBill