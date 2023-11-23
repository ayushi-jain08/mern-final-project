import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/User";
import ProductSlice from "./Slices/Product";

const store = configureStore({
  reducer: {
    user: UserSlice,
    product: ProductSlice,
  },
});

export default store;
