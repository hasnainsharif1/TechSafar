import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShop } from '../store/slices/shopSlice';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Box, Typography, Paper,
  CircularProgress, Alert, FormControlLabel, Checkbox
} from '@mui/material';

const CreateShop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.shops);
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
  });
  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (logo) {
      formData.append('logo', logo);
    }
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    dispatch(createShop(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSnackbar({ open: true, message: 'Shop created successfully!', severity: 'success' });
        navigate('/shops'); // Redirect to shops list after creation
      } else {
        setSnackbar({ open: true, message: error.detail || 'Failed to create shop.', severity: 'error' });
      }
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, width: 600 }}>
        <Typography variant="h5" mb={3} align="center">Create New Shop</Typography>
        {error && <Alert severity="error">{error.detail || 'Error creating shop.'}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Shop Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              variant="contained"
              component="label"
              sx={{ mr: 2 }}
            >
              Upload Logo
              <input
                type="file"
                hidden
                onChange={handleFileChange(setLogo)}
                accept="image/*"
              />
            </Button>
            {logo && <Typography variant="body2" display="inline">{logo.name}</Typography>}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              component="label"
              sx={{ mr: 2 }}
            >
              Upload Cover Image
              <input
                type="file"
                hidden
                onChange={handleFileChange(setCoverImage)}
                accept="image/*"
              />
            </Button>
            {coverImage && <Typography variant="body2" display="inline">{coverImage.name}</Typography>}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Shop'}
          </Button>
        </form>
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

export default CreateShop; 