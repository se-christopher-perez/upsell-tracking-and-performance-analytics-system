import { React, useState } from "react";
import { useAuth } from "../context/AuthContext"

function Login() {

    const { setUser } = useAuth()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        setError(null);

        fetch("http://localhost:5556/login", {

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
            .catch((err) => setError("Something went wrong"))
    }


    return (

        <>

            <div className="login-container">

                <div className="login-form-container">

                    <form className="login-form-container" onSubmit={handleSubmit}>

                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <input type="submit" value="Login" />

                        {error && <p className="error">{error}</p>}

                    </form>

                </div>

            </div>

        </>

    )

}

export default Login