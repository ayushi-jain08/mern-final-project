import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const HOST = "https://mern-final-foyk.onrender.com";
const HOST = "https://mern-final-u6mi.onrender.com";
//====================REGISTER USER=======================//
export const fetchRegister = createAsyncThunk(
  "data/fetchRegister",
  async ({ name, email, mobile, password, pic }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("img", pic);
    try {
      const response = await fetch(`${HOST}/api/user/register`, {
        method: "POST",
        mode: "cors",
        "Content-Type": "multipart/form-data",
        body: formData,
      });
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
export const fetchLogin = createAsyncThunk(
  "data/fetchLogin",
  async ({ email, password }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await fetch(`${HOST}/api/user/login`, {
        method: "POST",
        mode: "cors",
        "Content-Type": "multipart/form-data",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userDataInfo", JSON.stringify(data.users));
        return data.users;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// ======================LOGOUT========================
export const fetchLogout = createAsyncThunk("data/fetchLogout", async () => {
  localStorage.removeItem("userDataInfo");
  return null;
});
// =======================USER DATA=========================
export const fetchUserData = createAsyncThunk(
  "data/fetchUserData",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/abouts`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
// =======================USER DATA=========================
export const AddUserShippingAddress = createAsyncThunk(
  "data/AddUserShippingAddress",
  async ({ street, city, state, country, pinCode, phone }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/shipping`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ street, city, state, country, pinCode, phone }),
      });
      const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
// ==========================CONTACT US FORM=============================
export const FetchContactUs = createAsyncThunk(
  "data/FetchContactUs",
  async ({ name, email, message, userId }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/contact`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ name, email, message, userId }),
      });
      const data = await response.json();
      if (response.ok) {
        return data.message; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);
const infoStorage = () => {
  const StorageUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  if (StorageUserInfo) {
    return StorageUserInfo;
  }
  return null;
};
const initialState = {
  currentUser: infoStorage() || {},
  UserAllDetails: {},
  message: "",
  loading: false,
  error: null,
  loggedIn: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.msg;
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.loggedIn = true;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loggedIn = false;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = " ";
        localStorage.removeItem("userDataInfo");
        state.loggedIn = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.UserAllDetails = action.payload;
        state.loggedIn = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loggedIn = false;
      });
  },
});

export const { clearError } = UserSlice.actions;
export default UserSlice.reducer;
