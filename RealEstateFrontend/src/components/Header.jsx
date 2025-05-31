import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  login,
  logout,
  checkUser,
  createEstate,
  uploadEstateImage,
} from '../api/realEstateApi';
import EstateFormModal from './EstateFormModal';
import AddImagesModal from './AddImagesModal';
import { useAuthStore } from '../store/useAuthStore';
import { useEstateStore } from '../store/useEstateStore';

export default function Header() {
  const {
    isLoggedIn,
    role,
    username,
    setAuth,
    logout: clearAuth,
  } = useAuthStore();

  const navigate = useNavigate();
  const fetchEstatesData = useEstateStore((state) => state.fetchEstatesData);

  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [createdEstateId, setCreatedEstateId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleLogin = async () => {
    try {
      await login(usernameInput, password);
      const data = await checkUser();

      console.log('checkUser response:', data);

      setAuth({
        isLoggedIn: true,
        role: data.role,
        username: data.username,
        userId: Number(data.id),
      });
      setUsernameInput('');
      setPassword('');
      setLoginError('');
      fetchEstatesData();
    } catch {
      setLoginError('Login failed. Try another username and password.');
    }
  };

  const handleLogout = async () => {
    await logout();
    clearAuth();
    fetchEstatesData();
    navigate('/');
  };

  const handleSubmitEstate = async (formData) => {
    try {
      const createdEstate = await createEstate(formData);
      setShowCreate(false);
      setCreatedEstateId(createdEstate.id);
      setShowImageModal(true);
      fetchEstatesData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddImages = async (imageFile) => {
    try {
      if (imageFile && createdEstateId) {
        await uploadEstateImage(createdEstateId, imageFile);
      }
      setShowImageModal(false);
      fetchEstatesData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">
              👧 Budvanka Real Estate Agency 🌏 Montenegro
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            {['Admin', 'Agent'].includes(role) && (
              <Button
                variant="contained"
                onClick={() => setShowCreate(true)}
                sx={{ backgroundColor: '#6dbbf2', color: 'darkblue' }}
              >
                💾 Create Estate
              </Button>
            )}

            <Button color="inherit" component={Link} to="/">
              Search Estates
            </Button>
            <Button color="inherit" component={Link} to="/about-us">
              About Us
            </Button>

            {role === 'Admin' && (
              <Button color="inherit" component={Link} to="/admin/users">
                ⚙️ Manage Users
              </Button>
            )}

            {isLoggedIn ? (
              <>
                <Typography variant="body2">
                  You are logged in as: {username} ({role})
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Box display="flex" gap={1} alignItems="center">
                <TextField
                  sx={{ background: 'white' }}
                  variant="standard"
                  size="small"
                  placeholder="Username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
                <TextField
                  sx={{ background: 'white' }}
                  variant="standard"
                  size="small"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
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

      <EstateFormModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleSubmitEstate}
        initialData={null}
      />
      <AddImagesModal
        open={showImageModal}
        onClose={() => setShowImageModal(false)}
        onSubmit={handleAddImages}
        estateId={createdEstateId}
      />
    </>
  );
}
