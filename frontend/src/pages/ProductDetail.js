import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/slices/productSlice';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, Alert, Grid } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;
  if (error) return <Alert severity="error">{error.detail || 'Failed to load product.'}</Alert>;
  if (!product) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {product.images && product.images.length > 0 ? (
            <CardMedia
              component="img"
              image={product.images[0].image}
              alt={product.title}
              sx={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
            />
          ) : (
            <CardMedia
              component="img"
              image={'/placeholder.png'}
              alt="No image"
              sx={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>{product.title}</Typography>
              <Typography variant="h6" color="primary">Rs. {product.price}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Category: {product.category?.name || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Seller: {product.seller?.username || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail; 