import { useEffect } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import { checkUser } from './api/realEstateApi';
import { useAuthStore } from './store/useAuthStore';
import AdminUsersPage from './pages/AdminUsersPage';

export default function App() {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    checkUser()
      .then((data) => {
        setAuth({
          isLoggedIn: true,
          role: data.role,
          username: data.username,
          userId: Number(data.id),
        });
      })
      .catch(() => {
        setAuth({
          isLoggedIn: false,
          role: null,
          username: null,
          userId: null,
        });
      });
  }, []);

  return (
    <>
      <CssBaseline />
      <Box>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Routes>
      </Box>
    </>
  );
}
