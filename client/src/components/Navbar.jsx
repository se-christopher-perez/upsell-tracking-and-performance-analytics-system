
import React from "react"
import { useAuth } from "../context/AuthContext"
import { NavLink } from "react-router-dom"

function Navbar() {

    const { setUser } = useAuth()

    function handleLogout() {

        fetch("http://localhost:5556/logout", {

            method: "DELETE",
            credentials: "include"

        })
        .then((r) => {
            if(r.ok) {

                setUser(null)

            }
        })
        .catch((err) => console.log(err))

    }


    return (

        <>

            <div className="main-navbar-container">

                <div className="logout-button-container">

                    <button onClick={handleLogout}>Logout</button>

                </div>

                <div>

                    <nav>

                        <NavLink to="create-bill">Create a Bill</NavLink>
                        <NavLink to="check-bills">Check Bills</NavLink>

                    </nav>

                </div>

            </div>

        </>

    )

}

export default Navbar