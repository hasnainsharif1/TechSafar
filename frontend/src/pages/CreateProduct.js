import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../store/slices/productSlice';
import { fetchCategories } from '../store/slices/productSlice'; // Assuming you'll add this thunk
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Box, Typography, Paper,
  CircularProgress, Alert, MenuItem, InputLabel, Select, FormControl
} from '@mui/material';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.products); // Assuming you'll have a categories state
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'Used',
    negotiable: false,
    location: '',
  });
  const [images, setImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // Fetch categories when component mounts
    // dispatch(fetchCategories()); // Uncomment when fetchCategories is implemented
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    images.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(createProduct(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSnackbar({ open: true, message: 'Product created successfully!', severity: 'success' });
        navigate('/products'); // Redirect to products list after creation
      } else {
        setSnackbar({ open: true, message: error.detail || 'Failed to create product.', severity: 'error' });
      }
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, width: 600 }}>
        <Typography variant="h5" mb={3} align="center">Create New Product</Typography>
        {error && <Alert severity="error">{error.detail || 'Error creating product.'}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Title"
            name="title"
            value={form.title}
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
            required
          />
          <TextField
            label="Price (Rs.)"
            name="price"
            value={form.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={form.category}
              label="Category"
              onChange={handleChange}
            >
              {/* {categories && categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))} */}
              {/* Placeholder options, uncomment above when fetchCategories is ready */}
              <MenuItem value={1}>Mobiles</MenuItem>
              <MenuItem value={2}>Laptops</MenuItem>
              <MenuItem value={3}>Tablets</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="condition-label">Condition</InputLabel>
            <Select
              labelId="condition-label"
              id="condition"
              name="condition"
              value={form.condition}
              label="Condition"
              onChange={handleChange}
            >
              <MenuItem value="Used">Used</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Like New">Like New</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Fair">Fair</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mr: 2 }}
          >
            Upload Images
            <input
              type="file"
              multiple
              hidden
              onChange={handleImageChange}
              accept="image/*"
            />
          </Button>
          {images.length > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {images.length} image(s) selected.
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Product'}
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

export default CreateProduct; 