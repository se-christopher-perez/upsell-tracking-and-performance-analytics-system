import { React, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Navbar({ user, setUser }) {

    function handleLogout() {
        fetch("http://localhost:5556/logout", {
            method: "DELETE",
            credentials: "include",
        })
            .then((r) => {
                if (r.ok) {
                    setUser(null);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <>

            <div className="navbar-container">

                <p>welcome, {user.username}</p>

                <div className="link-button-container">

                    <nav className="nav-container">

                        <NavLink to="/create-bill">Page 1</NavLink>
                        <NavLink to="/check-stats">Page 2</NavLink>
                        <NavLink to="/manage-items">Page 3</NavLink>

                    </nav>

                    <div>

                        <button onClick={handleLogout}>Logout</button>

                    </div>

                </div>

            </div>

        </>

    )

}

export default Navbar