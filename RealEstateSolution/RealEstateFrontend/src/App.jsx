import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home'
import { CssBaseline, Box } from '@mui/material'
import { checkUser } from './api/realEstateApi'

export default function App() {
  const [auth, setAuth] = useState({ isLoggedIn: false, role: null, username: null })

  useEffect(() => {
    checkUser()
      .then(data => {
        setAuth({ isLoggedIn: true, role: data.role, username: data.username })
      })
      .catch(() => {
        setAuth({ isLoggedIn: false, role: null, username: null })
      })
  }, [])

  return (
    <>
      <CssBaseline />
      <Box>
        <Header auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path="/" element={<Home auth={auth} />} />
          {/* TODO: About Us, Our Team, Contact */}
        </Routes>
      </Box>
    </>
  )
}
