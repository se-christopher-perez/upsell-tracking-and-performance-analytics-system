
import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

import Signup from "./components/Signup"
import Login from "./components/Login";
import Navbar from "./components/Navbar";

import CreateBillPage from "./pages/CreateBillPage"
import CheckBillsPage from "./pages/CheckBillsPage"

import "./App.css"

function App() {

  const { user, loading } = useAuth()

  const [signup, setSignup] = useState(false)

  if (loading) {

    return <div className="main-app-container"><p>Loading...</p></div>

  }

  return (

    <>
      <div className="main-app-container">

        {user && <Navbar />}

        <Routes>

          {user ? (

            <>
              <Route path="/check-bills" element={<CheckBillsPage />} />

              <Route path="/create-bill" element={<CreateBillPage />} />

              <Route path="*" element={<Navigate to="/check-bills" />} />

            </>

          ) : (

            <>

              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />

              <Route path="*" element={<Navigate to="/login" />} />

            </>

          )}

        </Routes>

      </div>
    </>

  )

}

export default App