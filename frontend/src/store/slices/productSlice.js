import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/products/`, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/products/${id}/`, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/categories/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add these new thunks to the existing file

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/featured/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDailyEssentials = createAsyncThunk(
  'products/fetchDailyEssentials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/daily-essentials/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  'products/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/brands/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFeaturedBrands = createAsyncThunk(
  'products/fetchFeaturedBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/brands/featured/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update the initialState to include new state variables
const initialState = {
  products: [],
  featuredProducts: [],
  dailyEssentials: [],
  currentProduct: null,
  categories: [],
  brands: [],
  featuredBrands: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

// Add these extra reducers to the productSlice
extraReducers: (builder) => {
  // Existing reducers...
  
  // Featured Products
  builder.addCase(fetchFeaturedProducts.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.featuredProducts = action.payload;
  });
  builder.addCase(fetchFeaturedProducts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  
  // Daily Essentials
  builder.addCase(fetchDailyEssentials.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchDailyEssentials.fulfilled, (state, action) => {
    state.loading = false;
    state.dailyEssentials = action.payload;
  });
  builder.addCase(fetchDailyEssentials.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  
  // Brands
  builder.addCase(fetchBrands.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchBrands.fulfilled, (state, action) => {
    state.loading = false;
    state.brands = action.payload;
  });
  builder.addCase(fetchBrands.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  
  // Featured Brands
  builder.addCase(fetchFeaturedBrands.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchFeaturedBrands.fulfilled, (state, action) => {
    state.loading = false;
    state.featuredBrands = action.payload;
  });
  builder.addCase(fetchFeaturedBrands.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
}
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 10);
        state.currentPage = action.payload.current_page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.currentProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
        state.currentProduct = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentProduct, clearError } = productSlice.actions;
export default productSlice.reducer;