import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import { CssBaseline, Box } from '@mui/material'

export default function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          /*  backgroundColor: '#000',
           color: '#00ffcc',
           minHeight: '100vh',
           fontFamily: '"Press Start 2P", monospace', */
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* TO DO: ADD About Us, Our Team, Contact..*/}
        </Routes>
      </Box>
    </>
  )
}
