
import React from "react"
import { useAuth } from "../context/AuthContext"
import { NavLink } from "react-router-dom"

function Navbar() {

    const { user, setUser } = useAuth()

    function handleLogout() {

        fetch("http://localhost:5556/logout", {

            method: "DELETE",
            credentials: "include"

        })
            .then((r) => {
                if (r.ok) {

                    setUser(null)

                }
            })
            .catch((err) => console.log(err))

    }


    return (

        <>

            <div className="logout-button-container">

                <p><b>{user.username}</b> | <b className="logout" onClick={handleLogout} >Logout</b></p>

            </div>

            <div className="main-navbar-container">

                <div>

                    <nav>

                        <NavLink to="/create-bill">Create a Bill</NavLink>
                        <NavLink to="/check-bills">Check Bills</NavLink>

                    </nav>

                </div>

            </div>

        </>

    )

}

export default Navbar