import React, { useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia, IconButton, Divider, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, fetchFeaturedProducts, fetchDailyEssentials, fetchFeaturedBrands } from '../store/slices/productSlice';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    featuredProducts,
    dailyEssentials,
    categories, 
    featuredBrands,
    loading, 
    error 
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCategories());
    dispatch(fetchDailyEssentials());
    dispatch(fetchFeaturedBrands());
  }, [dispatch]);

  return (
    <Box>
      {/* Hero/Banner Section - Smart Wearable */}
      <Box
        sx={{
          bgcolor: '#1a237e', // Dark blue background
          color: 'white',
          py: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          height: 300,
          mt: -4,
          px: 8,
        }}
      >
        <Box sx={{ maxWidth: '50%' }}>
          <Typography variant="h6" component="p" gutterBottom>
            Best Deal Online on smart watches
          </Typography>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            SMART WEARABLE.
          </Typography>
          <Typography variant="h6" component="p">
            UP to 80% OFF
          </Typography>
        </Box>
        <Box sx={{ maxWidth: '40%', textAlign: 'right' }}>
          <img 
            src="/smart-watch.png" 
            alt="Smart Watch" 
            style={{ maxHeight: '220px' }} 
          />
        </Box>
      </Box>
      
      {/* Smartphone Deals Section */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Grab the best deal on <span style={{ color: '#0091ea' }}>Smartphones</span>
          </Typography>
          <Button component={Link} to="/products?category=smartphones" sx={{ textTransform: 'none' }}>
            View All &gt;
          </Button>
        </Box>
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12}><Typography>Loading products...</Typography></Grid>
          ) : error ? (
            <Grid item xs={12}><Typography color="error">Error loading products.</Typography></Grid>
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #eee', boxShadow: 'none' }}>
                  <CardActionArea component={Link} to={`/products/${product.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative', width: '100%', pt: '75%', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={product.images && product.images.length > 0 ? product.images[0].image : '/placeholder.png'}
                        alt={product.title}
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', p: 1 }}
                      />
                      {/* Discount badge */}
                      {product.discount_percentage > 0 && (
                        <Box sx={{ position: 'absolute', top: 8, right: 8, bgcolor: '#ff5722', color: 'white', borderRadius: '4px', px: 1, py: 0.5, fontSize: '0.75rem' }}>
                          {product.discount_percentage}% OFF
                        </Box>
                      )}
                    </Box>
                    <Divider />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ mb: 0.5, lineHeight: 1.3, fontWeight: 'bold' }}>{product.title}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', display: 'inline', mr: 1 }}>
                        Rs. {product.price}
                      </Typography>
                      {product.original_price && (
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', display: 'inline' }}>
                          Rs. {product.original_price}
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}><Typography>No featured products found.</Typography></Grid>
          )}
        </Grid>
      </Container>
      
      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Shop From <span style={{ color: '#0091ea' }}>Top Categories</span>
          </Typography>
          <Button component={Link} to="/categories" sx={{ textTransform: 'none' }}>
            View All &gt;
          </Button>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {categories.slice(0, 7).map((category) => (
            <Grid item key={category.id}>
              <Box 
                component={Link} 
                to={`/products?category=${category.slug}`}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    border: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}
                >
                  <img 
                    src={category.icon || '/category-placeholder.png'} 
                    alt={category.name}
                    style={{ maxWidth: '60%', maxHeight: '60%' }}
                  />
                </Box>
                <Typography variant="body2" align="center">
                  {category.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Top Electronics Brands */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Top <span style={{ color: '#0091ea' }}>Electronics Brands</span>
          </Typography>
          <Button component={Link} to="/brands" sx={{ textTransform: 'none' }}>
            View All &gt;
          </Button>
        </Box>
        <Grid container spacing={2}>
          {featuredBrands.map((brand) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={brand.id}>
              <Card 
                component={Link} 
                to={`/products?brand=${brand.slug}`}
                sx={{ 
                  height: 120, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  textDecoration: 'none',
                  bgcolor: brand.name === 'Apple' ? '#000' : brand.name === 'Realme' ? '#ffcc00' : brand.name === 'Xiaomi' ? '#ff6700' : '#fff',
                  color: brand.name === 'Apple' ? '#fff' : '#000',
                  '&:hover': { opacity: 0.9 }
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {brand.name}
                </Typography>
                <Typography variant="body2" sx={{ position: 'absolute', bottom: 10, right: 10 }}>
                  UP to 80% OFF
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Daily Essentials */}
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Daily <span style={{ color: '#0091ea' }}>Essentials</span>
          </Typography>
          <Button component={Link} to="/products?category=daily-essentials" sx={{ textTransform: 'none' }}>
            View All &gt;
          </Button>
        </Box>
        <Grid container spacing={2}>
          {dailyEssentials.slice(0, 6).map((product) => (
            <Grid item xs={6} sm={4} md={2} key={product.id}>
              <Card 
                component={Link} 
                to={`/products/${product.id}`}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  border: '1px solid #eee',
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src={product.images && product.images.length > 0 ? product.images[0].image : '/placeholder.png'} 
                    alt={product.title}
                    style={{ height: 100, objectFit: 'contain' }}
                  />
                </Box>
                <Box sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#0091ea', mt: 0.5 }}>
                    UP to 50% OFF
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;