
import { React, useState } from "react"
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

                }

            })
            .catch((err) => {

                console.log(err.message)

            })

    }

    return (

        <>

            <div>

                <div className="signup-container">

                    <div className="signup-form-container">

                        <form className="signup-form-container" onSubmit={handleSubmit}>

                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            <input type="submit" value="Sign Up" />

                            {error && <p className="error">{error}</p>}

                        </form>

                    </div>

                </div>

            </div>

        </>

    )

}

export default Signup