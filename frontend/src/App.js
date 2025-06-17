import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Snackbar, Alert as MuiAlert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';
import HeaderTopBar from './components/HeaderTopBar';
import MainNavbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import Shops from './pages/Shops';
import ShopDetail from './pages/ShopDetail';
import CreateShop from './pages/CreateShop';
import Profile from './pages/Profile';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleClose = () => setSnackbar({ ...snackbar, open: false });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Router>
      <HeaderTopBar />
      <MainNavbar showSnackbar={showSnackbar} />
      <CategoryBar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/create" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shops/:id" element={<ShopDetail />} />
          <Route path="/shops/create" element={<PrivateRoute><CreateShop /></PrivateRoute>} />
          <Route path="/login" element={<Login showSnackbar={showSnackbar} />} />
          <Route path="/register" element={<Register showSnackbar={showSnackbar} />} />
          <Route path="/profile" element={<PrivateRoute><Profile showSnackbar={showSnackbar} /></PrivateRoute>} />
        </Routes>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Container>
    </Router>
  );
}

export default App; 