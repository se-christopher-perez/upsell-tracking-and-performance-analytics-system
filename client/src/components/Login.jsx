
import { React, useState } from "react";
import { Link } from "react-router-dom";
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

                    setTimeout(() => {

                        setError(null)

                    }, 3000)

                }
            })
            .catch((err) => setError("Something went wrong"))
    }


    return (

        <>

            <div className="login-container">

                <div className="login-form-container">

                    <form className="login-form-container" onSubmit={handleSubmit}>

                        <label htmlFor="login-username">Username: </label><br/>

                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/><br/>

                        <label htmlFor="login-password">Password: </label><br/>

                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/><br/>

                        <input type="submit" value="Login" />

                        {error && <p className="error">{error}</p>}

                    </form>

                    <br/>

                    <Link to="/signup">Need an account? Sign Up</Link>

                </div>

            </div>

        </>

    )

}

export default Login