
import { React, useState } from "react"
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

function Signup() {

    const { setUser } = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    function handleSubmit(e) {

        e.preventDefault()

        setError(null)

        fetch("http://localhost:5556/signup", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password })

        })
            .then((r) => {

                return r.json().then((data) => ({ ok: r.ok, data }))

            })
            .then(({ ok, data }) => {

                if (ok) {

                    setUser(data)

                } else {

                    setError(data.error)

                    setTimeout(() => {

                        setError(null)

                    }, 3000)

                }

            })
            .catch((err) => setError("Something went wrong"))

    }

    return (

        <>

            <div>

                <div className="signup-container">

                    <div className="signup-form-container">

                        <form className="signup-form-container" onSubmit={handleSubmit}>

                            <label htmlFor="signup-username">Username: </label><br />

                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />

                            <label htmlFor="signup-password">Password: </label><br />

                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />

                            <input type="submit" value="Sign Up" />

                        </form>

                        <br />

                        <Link to="/login">Already have an account? Log In</Link>

                    </div>

                </div>

            </div>

            <div>

                {error && <p className="error"><br />{error}</p>}

            </div>

        </>

    )

}

export default Signup