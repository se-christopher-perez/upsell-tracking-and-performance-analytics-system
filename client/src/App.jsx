import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Login from './components/Login'
import Navbar from './components/Navbar'
import CreateBillPage from "./pages/CreateBillPage"
import CheckStatsPage from "./pages/CheckStatsPage"
import ManageItemsTermsPage from "./pages/ManageItemsTermsPage"

import './App.css'

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5556/check_session", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className='app-container'>


        {user ? (

          <>

            <Navbar setUser={setUser} user={user} />

            <Routes>
              <Route path="/create-bill" element={<CreateBillPage />} />
              <Route path="/check-stats" element={<CheckStatsPage user={user}/>} />
              <Route path="/manage-items" element={<ManageItemsTermsPage />} />
              <Route path="*" element={<CreateBillPage />} />
            </Routes>

          </>

        ) : (

          <Login onLogin={setUser} />

        )}

      </div>
    </>
  )
}

export default App
