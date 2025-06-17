import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../store/slices/authSlice';
import { Box, Typography, TextField, Button, CircularProgress, Alert, Paper, Avatar, Snackbar, Alert as MuiAlert } from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSnackbar({ open: true, message: 'Profile updated!', severity: 'success' });
        setEdit(false);
      } else {
        setSnackbar({ open: true, message: 'Update failed', severity: 'error' });
      }
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  if (loading && !edit) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;
  if (error && !edit) return <Alert severity="error">{error.detail || 'Failed to load profile.'}</Alert>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar sx={{ width: 80, height: 80, mb: 2 }} src={user?.profile_picture || ''} />
          <Typography variant="h5">{user?.username}</Typography>
        </Box>
        {edit ? (
          <form onSubmit={handleSave}>
            <TextField
              label="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </Box>
          </form>
        ) : (
          <>
            <Typography variant="body1" mt={2}><b>First Name:</b> {user?.first_name}</Typography>
            <Typography variant="body1"><b>Last Name:</b> {user?.last_name}</Typography>
            <Typography variant="body1"><b>Email:</b> {user?.email}</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleEdit}>Edit Profile</Button>
          </>
        )}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Profile; 