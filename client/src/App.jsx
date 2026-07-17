import React from "react";
import { useAuth } from "./context/AuthContext"

function App() {

  const { user, loading } = useAuth()

  if (loading) {

    return <div className="main-app-container"><p>Loading...</p></div>

  }

  return(

    <>
      <div className="main-app-container">

        {user ? (

          <h1>Welcome, {user.username}!</h1>
        ): (

          <h1>Login</h1>

        )}

      </div>
    </>

  )

}

export default App