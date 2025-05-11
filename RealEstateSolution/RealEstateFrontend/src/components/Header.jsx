import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField
} from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { login, logout, checkUser } from '../api/realEstateApi'

export default function Header({ auth, setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLogin = async () => {
    try {
      await login(username, password)
      const data = await checkUser()
      setAuth({ isLoggedIn: true, role: data.role, username: data.username })
      setUsername('')
      setPassword('')
      setLoginError('')
    } catch {
      setLoginError('Login failed')
    }
  }

  const handleLogout = async () => {
    await logout()
    setAuth({ isLoggedIn: false, role: null, username: null })
  }

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        <Box display="flex" alignItems="center">
          {/* <img src={logo} alt="Real Estate Logo" height={50} style={{ marginRight: 16 }} /> */}
          <Typography variant="h6">👧 Budvanka Real Estate Agency 🌏 Montenegro</Typography>
        </Box>


        <Box display="flex" alignItems="center" gap={2}>
          <Button color="inherit" component={Link} to="/">Search Estates</Button>
          <Button color="inherit" component={Link} to="/about-us">About Us</Button>
          {/*<Button color="inherit">Our Team</Button>
          <Button color="inherit">Contact</Button> */}

          {auth.isLoggedIn ? (
            <>
              <Typography variant="body2">
                You are logged in as: {auth.username} ({auth.role})
              </Typography>
{/* 
              {auth.role === 'Admin' && (
                <Button color="inherit">Admin Panel</Button>
              )}
 */}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Box display="flex" gap={1} alignItems="center">
              <TextField
                sx={{background: "white"}}
                variant="standard"
                size="small"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                sx={{background: "white"}}
                variant="standard"
                size="small"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button color="inherit" onClick={handleLogin}>Login</Button>
              {loginError && (
                <Typography color="error" variant="caption">
                  {loginError}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
