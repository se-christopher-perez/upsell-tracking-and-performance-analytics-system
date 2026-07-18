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

        {user ? (

          <>

            <h1>Welcome, {user.username}!</h1>
            <Navbar />
            <Routes>

              <Route path="check-bills" element={<CheckBillsPage />} />
              <Route path="/create-bill" element={<CreateBillPage />} />
              <Route path="*" element={<Navigate to="/create-bill" />} />

            </Routes>

          </>

        ) : (

          <>

            {signup ? <Signup /> : <Login />}

            <span>{signup ? "Already have an account?" : "Need an account?"}</span>

            <span onClick={() => setSignup(!signup)}>{signup ? " Log In" : " Sign Up"}</span>

          </>

        )}

      </div>
    </>

  )

}

export default App