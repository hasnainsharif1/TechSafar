import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopById } from '../store/slices/shopSlice';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, Alert, Grid } from '@mui/material';

const ShopDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentShop: shop, loading, error } = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(fetchShopById(id));
  }, [dispatch, id]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;
  if (error) return <Alert severity="error">{error.detail || 'Failed to load shop.'}</Alert>;
  if (!shop) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {shop.logo ? (
            <CardMedia
              component="img"
              image={shop.logo}
              alt={shop.name}
              sx={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
            />
          ) : (
            <CardMedia
              component="img"
              image={'/placeholder.png'}
              alt="No image"
              sx={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>{shop.name}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{shop.description}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Owner: {shop.owner?.username || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: {shop.address || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopDetail; 