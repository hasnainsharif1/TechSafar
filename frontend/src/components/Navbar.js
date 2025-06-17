import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, InputBase, alpha, styled, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Search = styled('div')(({
  theme
}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({
  theme
}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({
  theme
}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const MainNavbar = ({ showSnackbar }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        showSnackbar('Logged out successfully!', 'success');
      } else {
        showSnackbar(res.payload.detail || 'Logout failed.', 'error');
      }
    });
    navigate('/');
  };

  return (
    <AppBar position="static" color="inherit" sx={{ bgcolor: 'white', color: '#333', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            display: { xs: 'none', sm: 'block' },
            fontWeight: 'bold',
            color: '#000',
            textDecoration: 'none',
          }}
        >
          TechSafar
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: '#777' }}/>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search essentials, groceries and more..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={3} alignItems="center">
          <Button color="inherit" sx={{ textTransform: 'none' }} startIcon={<ListIcon />}>
            Categories
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" sx={{ textTransform: 'none' }} startIcon={<PersonIcon />} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" sx={{ textTransform: 'none' }} component={Link} to="/login" startIcon={<PersonIcon />}>
              Sign Up/Sign In
            </Button>
          )}
          <Button color="inherit" sx={{ textTransform: 'none' }} startIcon={<ShoppingCartIcon />}>
            Cart
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar; 