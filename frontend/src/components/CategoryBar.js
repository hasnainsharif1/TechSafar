import React from 'react';
import { Box, Button, Menu, MenuItem, alpha, styled } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CategoryButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  color: '#333',
  padding: theme.spacing(1, 1.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

const CategoryBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ bgcolor: '#fff', py: 1, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <CategoryButton
        id="groceries-button"
        aria-controls={open ? 'groceries-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ bgcolor: '#1976d2', color: 'white', '&:hover': { bgcolor: '#1565c0' } }}
      >
        Groceries
      </CategoryButton>
      <Menu
        id="groceries-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'groceries-button',
        }}
      >
        <MenuItem onClick={handleClose}>Fruits & Vegetables</MenuItem>
        <MenuItem onClick={handleClose}>Dairy & Bakery</MenuItem>
        <MenuItem onClick={handleClose}>Snacks</MenuItem>
      </Menu>

      <CategoryButton>Premium Fruits</CategoryButton>
      <CategoryButton>Home & Kitchen</CategoryButton>
      <CategoryButton>Fashion</CategoryButton>
      <CategoryButton>Electronics</CategoryButton>
      <CategoryButton>Beauty</CategoryButton>
      <CategoryButton>Home Improvement</CategoryButton>
      <CategoryButton>Sports, Toys & Luggage</CategoryButton>
    </Box>
  );
};

export default CategoryBar; 