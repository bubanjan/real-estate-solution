import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useUserStore } from '../store/useUserStore.js';
import { roles } from '../constants/enums.js';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useAuthStore } from '../store/useAuthStore.js';

export default function AdminUsersPage() {
  const currentUserId = useAuthStore((state) => state.userId);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { users, fetchUsers, addUser, removeUser } = useUserStore();

  const [showModal, setShowModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'Agent',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isLoggedIn && currentUserId !== null && currentUserId !== undefined) {
      fetchUsers();
    }
  }, [isLoggedIn, currentUserId]);

  const validate = () => {
    const newErrors = {};
    if (!form.userName || form.userName.trim() === '') {
      newErrors.userName = 'Username is required';
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!form.password || form.password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    if (!form.role || !['Admin', 'Agent'].includes(form.role)) {
      newErrors.role = 'Role must be Admin or Agent';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = async () => {
    if (!validate()) return;
    await addUser(form);
    setForm({ userName: '', email: '', password: '', role: 'Agent' });
    setErrors({});
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRequestDelete = (userId) => {
    setSelectedUserId(userId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeUser(selectedUserId);
    } catch (err) {
      alert(err.message);
    } finally {
      setConfirmOpen(false);
      setSelectedUserId(null);
    }
  };

  if (!isLoggedIn || currentUserId === null || currentUserId === undefined) {
    return <Typography>Loading user information...</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        👤 Admin - Manage Users
      </Typography>

      <Button variant="contained" onClick={() => setShowModal(true)}>
        💾 Add New User
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>UserName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.id === currentUserId ? (
                  <Typography variant="body2" color="textSecondary">
                    👤 You
                  </Typography>
                ) : ![9, 10].includes(user.id) ? (
                  <Button
                    color="error"
                    onClick={() => handleRequestDelete(user.id)}
                  >
                    🗑 Delete
                  </Button>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    🚫 Protected
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Username"
              name="userName"
              autoComplete="off"
              value={form.userName}
              onChange={handleChange}
              fullWidth
              error={!!errors.userName}
              helperText={errors.userName}
            />
            <TextField
              label="Email"
              name="email"
              autoComplete="new-email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
            />
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={form.role}
                label="Role"
                onChange={handleChange}
              >
                {roles.map((r) => (
                  <MenuItem key={r.value} value={r.value}>
                    {r.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteConfirmationModal
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setSelectedUserId(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
