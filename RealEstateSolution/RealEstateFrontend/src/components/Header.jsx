import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <img src={logo} alt="Real Estate Logo" height={50} style={{ marginRight: 16 }} />
          <Typography variant="h6">Real Estate</Typography>
        </Box>
        <Box>
          <Button color="inherit" component={Link} to="/">Search Estates</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Our Team</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}