
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:5556/check_session", {
            
            headers: {"Content-Type": "application/json"},
            credentials: "include"

        })
        .then((r) => {

            return r.ok ? r.json() : null

        })
        .then((data) => setUser(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))

    }, [])

    const value = { user, setUser, loading }

    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )

}

export function useAuth() {

    return useContext(AuthContext)

}
