import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
  Popover,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const [showCreate, setShowCreate] = useState(false);
  const [createdEstateId, setCreatedEstateId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleLogin = async () => {
    try {
      await login(usernameInput, password);
      const data = await checkUser();

      setAuth({
        isLoggedIn: true,
        role: data.role,
        username: data.username,
        userId: Number(data.id),
      });

      setUsernameInput('');
      setPassword('');
      setLoginError('');
      handleMenuClose();
      fetchEstatesData();
    } catch {
      setLoginError('Login failed. Try another username and password.');
    }
  };

  const handleLogout = async () => {
    await logout();
    clearAuth();
    handleMenuClose();
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

            <Box>
              {isLoggedIn ? (
                <>
                  <IconButton onClick={handleMenuClick} color="inherit">
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem disabled>
                      Signed in as{' '}
                      <strong style={{ marginLeft: 4 }}>{username}</strong>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleMenuClick}
                    color="inherit"
                    variant="contained"
                    sx={{ backgroundColor: '#6dbbf2', color: 'darkblue' }}
                  >
                    Log in
                  </Button>
                  <Popover
                    open={openMenu}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <Box sx={{ p: 2, width: '250px' }}>
                      <TextField
                        label="Username"
                        fullWidth
                        variant="standard"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        autoFocus
                      />
                      <TextField
                        label="Password"
                        fullWidth
                        variant="standard"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mt: 2 }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleLogin();
                        }}
                      />
                      {loginError && (
                        <Typography variant="caption" sx={{ color: '#f59542' }}>
                          {loginError}
                        </Typography>
                      )}
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                    </Box>
                  </Popover>
                </>
              )}
            </Box>
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
