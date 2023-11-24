import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const HOST = "https://mern-final-foyk.onrender.com";
// ==================CATEGORY WISE PRODUCTS=========================
export const fetchCategory = createAsyncThunk(
  "data/fetchRegister",
  async (selectedCategory, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${HOST}/api/product/gets/?category=${selectedCategory}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // Fix the header syntax
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//=========================ALL PRODUCTS========================//
export const fetchAllProduct = createAsyncThunk(
  "data/fetchAllProduct",
  async ({ page, sort, brand, category }) => {
    try {
      const response = await fetch(
        `${HOST}/api/product/all?page=${page}&sort=${sort}&brand=${brand}&category=${category}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // Fix the header syntax
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return {
          products: data.products,
          totalPages: data.totalPages,
          totalProducts: data.totalProducts,
          currentPage: data.currentPage,
        };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
// =======================GET SINGLE PRODUCT======================
export const fetchSingleProduct = createAsyncThunk(
  "data/fetchSingleProduct",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${HOST}/api/product/get/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
// ======================POST REVIEW=======================
export const fetchPostReview = createAsyncThunk(
  "data/fetchPostReview",
  async ({ productId, rating, comment }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/product/${productId}/review`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);

// =========================GET REVIEW=============================
export const fetchGetReview = createAsyncThunk(
  "data/fetchGetReview ",
  async (productId) => {
    try {
      const response = await fetch(
        `${HOST}/api/product/${productId}/getreview`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);

// ============================DELETE REVIEW==========================
export const fetchDeleteReview = createAsyncThunk(
  "data/fetchDeleteReview",
  async (reviewId) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/${reviewId}/review`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return reviewId;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);

// =====================GET RELATED PRODUCT=====================
export const fetchRelatedProduct = createAsyncThunk(
  "data/fetchRelatedProducts",
  async (productId) => {
    try {
      const response = await fetch(
        `${HOST}/api/product/related-product/${productId}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);
//  ==============ADD TO CARTS======================
export const AddToCart = createAsyncThunk(
  "data/AddToCart",
  async ({ productId, quantity }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/product/addtocart`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ productId, quantity }), // Use the correct parameter name here
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);
// ======================GET CART PRODUCT==========================
export const fetchCartProduct = createAsyncThunk(
  "data/fetchCartData",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/product/getcart`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);
// ======================UPDATE CART QUANTITY=======================
export const fetchUpdateCartQty = createAsyncThunk(
  "data/fetchUpdateCartQty",
  async ({ productId, operation }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/product/updatecart`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ productId, operation }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);

// ===========================DELETE PRODUCTS FROM CART=====================
export const RemoveCartProduct = createAsyncThunk(
  "data/RemoveCartProduct",
  async (productId) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/product/deletecart`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);

const initialState = {
  categoryProduct: [],
  allProductInfo: [],
  totalPage: 0,
  totalProduct: 0,
  singleProduct: [],
  cartProductInfo: [],
  allReview: [],
  relatedProduct: [],
  loading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allProductInfo = action.payload.products;
        state.totalPage = action.payload.totalPages;
        state.totalProduct = action.payload.totalProducts;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetReview.fulfilled, (state, action) => {
        state.loading = false;
        state.allReview = action.payload;
      })
      .addCase(fetchGetReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchDeleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeleteReview.fulfilled, (state, action) => {
        state.loading = false;
        const deletedReviewId = action.payload;
        // Filter out the deleted review from the array
        state.allReview = state.allReview.filter(
          (review) => review._id !== deletedReviewId
        );
      })
      .addCase(fetchDeleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRelatedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProduct = action.payload; // Update the state with fetched categories
      })
      .addCase(fetchRelatedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCartProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProductInfo = action.payload;
      })
      .addCase(fetchCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ProductSlice.reducer;
