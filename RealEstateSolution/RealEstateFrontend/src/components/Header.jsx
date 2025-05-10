import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { login, logout, checkUser } from '../api/realEstateApi.js'

export default function Header() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    checkUser()
      .then(data => setUser(data.username))
      .catch(() => setUser(null))
  }, [])

  const handleLogin = async () => {
    try {
      await login(username, password)
      const data = await checkUser()
      setUser(data.username)
      setUsername('')
      setPassword('')
      setLoginError('')
    } catch {
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <img src={logo} alt="Real Estate Logo" height={50} style={{ marginRight: 16 }} />
          <Typography variant="h6">Real Estate</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Button color="inherit" component={Link} to="/">Search Estates</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Our Team</Button>
          <Button color="inherit">Contact</Button>

          {user ? (
            <>
              <Typography variant="body2">You are logged in as: {user}</Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Box display="flex" gap={1} alignItems="center">
              <TextField
                variant="standard"
                size="small"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                variant="standard"
                size="small"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button color="inherit" onClick={handleLogin}>Login</Button>
              {loginError && <Typography color="error" variant="caption">{loginError}</Typography>}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
