import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Async thunks
export const fetchShops = createAsyncThunk(
  'shops/fetchShops',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/shops/`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchShopById = createAsyncThunk(
  'shops/fetchShopById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/shops/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createShop = createAsyncThunk(
  'shops/createShop',
  async (shopData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/shops/`, shopData, {
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

export const updateShop = createAsyncThunk(
  'shops/updateShop',
  async ({ id, shopData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/shops/${id}/`, shopData, {
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

export const deleteShop = createAsyncThunk(
  'shops/deleteShop',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/shops/${id}/`, {
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

const initialState = {
  shops: [],
  currentShop: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const shopSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    clearCurrentShop: (state) => {
      state.currentShop = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Shops
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 10);
        state.currentPage = action.payload.current_page;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Shop by ID
      .addCase(fetchShopById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShop = action.payload;
      })
      .addCase(fetchShopById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Shop
      .addCase(createShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops.unshift(action.payload);
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Shop
      .addCase(updateShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shops.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.shops[index] = action.payload;
        }
        state.currentShop = action.payload;
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Shop
      .addCase(deleteShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = state.shops.filter(s => s.id !== action.payload);
        state.currentShop = null;
      })
      .addCase(deleteShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentShop, clearError } = shopSlice.actions;
export default shopSlice.reducer; 