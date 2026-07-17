import React from "react";
import { useAuth } from "./context/AuthContext"
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {

  const { user, loading } = useAuth()

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

          </>

        ) : (

          <Login />

        )}

      </div>
    </>

  )

}

export default App