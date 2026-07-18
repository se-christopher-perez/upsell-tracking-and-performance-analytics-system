
import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

import Signup from "./components/Signup"
import Login from "./components/Login";
import Navbar from "./components/Navbar";

import CreateBillPage from "./pages/CreateBillPage"
import CheckBillsPage from "./pages/CheckBillsPage"

import loadingGif from "./assets/loading.gif"

import "./App.css"

function App() {

  const { user, loading } = useAuth()

  const [signup, setSignup] = useState(false)

  if (loading) {

    return <div className="main-app-container"><img src={loadingGif} alt="Loading..." className="loading-gif" /></div>

  }

  return (

    <>
      <div className="main-app-container">

        <div>

          <h1 className="title">🌭 🥙 🍕 🍗 🍟 🍜 🍣 🥡 🥩 🍝 🍔<br/>🥩 🍝 🍔 Upsell Tab Tracker 🍷 🍺 🍸<br/>🍷 🍺 🍸 ☕ 🍾 🍻 🍵  🥃 🍹 🧉 🍶</h1>

        </div>

        {user && <Navbar />}

        <div className="scrollable-content">

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

      </div>
    </>

  )

}

export default App