import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../store/slices/shopSlice';
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Alert, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Shops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shops, loading, error } = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;
  if (error) return <Alert severity="error">{error.detail || 'Failed to load shops.'}</Alert>;

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {shops && shops.length > 0 ? (
        shops.map((shop) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={shop.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/shops/${shop.id}`)}>
                {shop.logo && (
                  <CardMedia
                    component="img"
                    height="120"
                    image={shop.logo || '/placeholder.png'}
                    alt={shop.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>{shop.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{shop.description}</Typography>
                  <Typography variant="subtitle2" color="primary" sx={{ mt: 1 }}>
                    Owner: {shop.owner?.username || 'N/A'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}><Alert severity="info">No shops found.</Alert></Grid>
      )}
    </Grid>
  );
};

export default Shops; 