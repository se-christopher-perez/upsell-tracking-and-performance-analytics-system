import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {

    fetch("/check_sessions")
      .then((r) => r.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div className='app-container'>

        {user ? <p>Logged In!</p> : <p>Logged Out!</p>}

      </div>
    </>
  )
}

export default App
