import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Alert, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;
  if (error) return <Alert severity="error">{error.detail || 'Failed to load products.'}</Alert>;

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
                {product.images && product.images.length > 0 && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.images[0].image || '/placeholder.png'}
                    alt={product.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                    Rs. {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}><Alert severity="info">No products found.</Alert></Grid>
      )}
    </Grid>
  );
};

export default Products; 