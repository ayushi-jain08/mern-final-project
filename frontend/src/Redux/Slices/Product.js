import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const HOST = "https://mern-final-foyk.onrender.com";

const HOST = "https://mern-final-u6mi.onrender.com";
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

// ===========================DELETE PRODUCTS FROM CART=====================
export const DeleteWholeCart = createAsyncThunk(
  "data/DeleteWholeCart",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/product/deletewholecart`, {
        method: "DELETE",
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
// ========================ADD TO WISHLIST===================
export const AddToWishList = createAsyncThunk(
  "data/AddToWishList",
  async (productId) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/product/addtowishlist`, {
        method: "POST",
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
      throw new Error("An  while processing your request.");
    }
  }
);
// /  ========================GET WISHLIST PRODUCT======================
export const fetchWishListItem = createAsyncThunk(
  "data/fetchWishListItem",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/product/getwishlist`, {
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
// ==========================GET CATEGORIES=========================
export const fetchGetCategory = createAsyncThunk(
  "data/fetchGetCategory",
  async () => {
    try {
      const response = await fetch(`${HOST}/api/category/get`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
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

// ====================GET SUBCATEGORY======================
export const fetchSubCategory = createAsyncThunk(
  "data/fetchSubCategory ",
  async (categoryId) => {
    try {
      const response = await fetch(`${HOST}/api/category/${categoryId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
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

// =================GET SUBCATEGORY PRODUCT=====================
export const fetchSucategoryProduct = createAsyncThunk(
  "data/fetchSucategoryProduct",
  async ({ page, subcategoryID }) => {
    try {
      const response = await fetch(
        `${HOST}/api/subcategory/${subcategoryID}?page=${page}`,
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
        return {
          subcategoryproduct: data.products,
          SubtotalPages: data.totalPages,
          totalsubproduct: data.totalProducts,
        };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);
//=====================GET ALL SUBCATEGORY=====================//
export const fetchAllSubCategory = createAsyncThunk(
  "data/fetchAllSubCategory ",
  async () => {
    try {
      const response = await fetch(`${HOST}/api/subcategory/get`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
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
// =================CREATE ORDER=================================
export const CreateOrder = createAsyncThunk(
  "data/CreateOrder",
  async ({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/order/create`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({
          shippingInfo,
          orderItems,
          paymentInfo,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An  while processing your request.");
    }
  }
);
export const FetchAllOrders = createAsyncThunk(
  "data/FetchAllOrders",
  async () => {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    try {
      const response = await fetch(`${HOST}/api/order/get`, {
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
// =======================GET SINGLE ORDER=======================
export const GetSingleOrder = createAsyncThunk(
  "data/GetSingleOrder",
  async (id) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/order/get/${id}`, {
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
// ====================FETCH SEARCH PRODUCT====================
export const FetchSearchProduct = createAsyncThunk(
  "data/FetchSearchProduct",
  async (searchTermUrl) => {
    try {
      const response = await fetch(
        `${HOST}/api/product/search?searchTerm=${searchTermUrl}`,
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
      console.error("Error fetching data:", error);
    }
  }
);
// =======================GET SINGLE ORDER=======================
export const FetchProductByCategory = createAsyncThunk(
  "data/FetchProductByCategory",
  async (category) => {
    try {
      const response = await fetch(`${HOST}/api/product/${category}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
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
const initialState = {
  categoryProduct: [],
  allProductInfo: [],
  totalPage: 0,
  totalProduct: 0,
  singleProduct: [],
  cartProductInfo: [],
  allReview: [],
  relatedProduct: [],
  wishListProductInfo: [],
  mainCategory: [],
  SubCategory: [],
  SubCategoryProduct: [],
  allSubcategory: [],
  allOrders: [],
  SingleOrder: [],
  SearchProduct: [],
  ProductByCategory: [],
  totalSubProducts: 0,
  SubtotalPage: 0,
  loading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSubCategoryProduct: (state) => {
      state.SubCategoryProduct = [];
    },
  },
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
      })
      .addCase(AddToWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToWishList.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(AddToWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWishListItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishListItem.fulfilled, (state, action) => {
        state.loading = false;
        state.wishListProductInfo = action.payload;
      })
      .addCase(fetchWishListItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.mainCategory = action.payload; // Update the state with fetched categories
      })
      .addCase(fetchGetCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.SubCategory = action.payload; // Update the state with fetched categories
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSucategoryProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSucategoryProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.SubCategoryProduct = action.payload.subcategoryproduct; // Update the state with fetched categories
        state.SubtotalPage = action.payload.SubtotalPages;
        state.totalSubProducts = action.payload.totalsubproduct;
      })
      .addCase(fetchSucategoryProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAllSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubcategory = action.payload; // Update the state with fetched categories
      })
      .addCase(fetchAllSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(CreateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchAllOrders.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(FetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Update the state with fetched categories
      })
      .addCase(GetSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.SingleOrder = action.payload;
      })
      .addCase(GetSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Update the state with fetched categories
      })
      .addCase(FetchSearchProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchSearchProduct.fulfilled, (state, action) => {
        state.SearchProduct = action.payload;
        state.loading = false;
      })
      .addCase(FetchSearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Update the state with fetched categories
      })
      .addCase(FetchProductByCategory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchProductByCategory.fulfilled, (state, action) => {
        state.ProductByCategory = action.payload;
        state.loading = false;
      })
      .addCase(FetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Update the state with fetched categories
      });
  },
});
export const { clearSubCategoryProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
