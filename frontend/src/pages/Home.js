import React, { useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia, IconButton, Divider, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../store/slices/productSlice';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch all products (no limit)
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box>
      {/* Hero/Banner Section - Generic TechSafar theme */}
      <Box
        sx={{
          bgcolor: '#2196f3', // A vibrant blue for TechSafar
          color: 'white',
          py: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          height: 350, // Slightly taller banner
          mt: -4, // Adjust to pull up closer to the nav bar
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            TechSafar.pk
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your Destination for Quality Electronics
          </Typography>
          <Typography variant="h6" component="p" sx={{ maxWidth: '600px' }}>
            Discover amazing deals on a wide range of second-hand electronics, from smartphones to laptops, and much more.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/products"
            sx={{ mt: 4, bgcolor: '#ffc107', '&:hover': { bgcolor: '#ffb300' } }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* All Products Section - Long Scrolling */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Featured <span style={{ color: '#2196f3' }}>Products</span>
          </Typography>
          <Button component={Link} to="/products" sx={{ textTransform: 'none' }}>
            View All &gt;
          </Button>
        </Box>
        <Grid container spacing={3}> {/* Changed from Box to Grid container */}
          {productsLoading ? (
            <Grid item xs={12}><Typography>Loading products...</Typography></Grid>
          ) : productsError ? (
            <Grid item xs={12}><Typography color="error">Error loading products.</Typography></Grid>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}> {/* Responsive grid items */}
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #eee', boxShadow: 'none' }}>
                  <CardActionArea component={Link} to={`/products/${product.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative', width: '100%', pt: '75%', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={product.images && product.images.length > 0 ? product.images[0].image : '/placeholder.png'}
                        alt={product.title}
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', p: 1 }}
                      />
                      {/* Discount badge - example, you'd calculate this dynamically */}
                      <Box sx={{ position: 'absolute', top: 8, right: 8, bgcolor: '#ff5722', color: 'white', borderRadius: '4px', px: 1, py: 0.5, fontSize: '0.75rem' }}>
                        SALE!
                      </Box>
                    </Box>
                    <Divider />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ mb: 0.5, lineHeight: 1.3, fontWeight: 'bold' }}>{product.title}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', display: 'inline', mr: 1 }}>
                        Rs. {product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', display: 'inline' }}>
                        Rs. {parseInt(product.price * 1.2).toFixed(0)} {/* Example original price */}
                      </Typography>
                      <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                        Save - Rs. {parseInt(product.price * 0.2).toFixed(0)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : ( 
            <Grid item xs={12}><Typography>No products found.</Typography></Grid>
          )}
        </Grid>
      </Container>

      {/* Shop From Top Categories Section - Long Scrolling */}
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Shop From <span style={{ color: '#2196f3' }}>Top Categories</span>
          </Typography>
          <Button component={Link} to="/shops" sx={{ textTransform: 'none' }}>
            View All &gt;
          </Button>
        </Box>
        <Grid container spacing={3}> {/* Changed from Box to Grid container */}
          {categoriesLoading ? (
            <Grid item xs={12}><Typography>Loading categories...</Typography></Grid>
          ) : categoriesError ? (
            <Grid item xs={12}><Typography color="error">Error loading categories.</Typography></Grid>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}> {/* Responsive grid items */}
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', border: '1px solid #eee', boxShadow: 'none' }}>
                  <CardActionArea component={Link} to={`/products?category=${category.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={'/category-placeholder.png'} // Placeholder for category image
                      alt={category.name}
                      sx={{ objectFit: 'contain', p: 1 }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{category.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}><Typography>No categories found.</Typography></Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 