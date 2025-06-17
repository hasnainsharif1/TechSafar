import React, { useEffect } from 'react';
import { Box, Button, Menu, MenuItem, alpha, styled } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/slices/productSlice';
import { Link } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define main categories for the navbar
  const mainCategories = [
    { name: 'Groceries', path: '/products?category=groceries' },
    { name: 'Premium Fruits', path: '/products?category=fruits' },
    { name: 'Home & Kitchen', path: '/products?category=home-kitchen' },
    { name: 'Fashion', path: '/products?category=fashion' },
    { name: 'Electronics', path: '/products?category=electronics' },
    { name: 'Beauty', path: '/products?category=beauty' },
    { name: 'Home Improvement', path: '/products?category=home-improvement' },
    { name: 'Sports, Toys & Luggage', path: '/products?category=sports-toys' },
  ];

  return (
    <Box sx={{ bgcolor: '#fff', py: 1, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {mainCategories.map((category, index) => (
        <CategoryButton
          key={index}
          id={`${category.name.toLowerCase()}-button`}
          aria-controls={open && selectedCategory?.name === category.name ? `${category.name.toLowerCase()}-menu` : undefined}
          aria-haspopup="true"
          aria-expanded={open && selectedCategory?.name === category.name ? 'true' : undefined}
          onClick={(e) => handleClick(e, category)}
          endIcon={<ArrowDropDownIcon />}
          component={Link}
          to={category.path}
          sx={{
            bgcolor: index === 0 ? '#1976d2' : 'transparent',
            color: index === 0 ? 'white' : 'inherit',
            '&:hover': { bgcolor: index === 0 ? '#1565c0' : 'rgba(25, 118, 210, 0.05)' }
          }}
        >
          {category.name}
        </CategoryButton>
      ))}

      {selectedCategory && (
        <Menu
          id={`${selectedCategory.name.toLowerCase()}-menu`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': `${selectedCategory.name.toLowerCase()}-button`,
          }}
        >
          {/* Filter child categories based on parent */}
          {categories
            .filter(cat => cat.parent && cat.parent.name === selectedCategory.name)
            .map((category) => (
              <MenuItem 
                key={category.id} 
                onClick={handleClose}
                component={Link}
                to={`/products?category=${category.slug}`}
              >
                {category.name}
              </MenuItem>
            ))}
        </Menu>
      )}
    </Box>
  );
};

export default CategoryBar;