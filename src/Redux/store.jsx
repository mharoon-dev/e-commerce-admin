import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice.jsx";
import productReducer from "./Slices/productSlice.jsx";
import categoryReducer from "./Slices/categorySlice.jsx";
import usersReducer from "./Slices/usersSlice.jsx";
import ordersReducer from "./Slices/orderSlice.jsx";
import winDrawReducer from "./Slices/winDrawSlice.jsx";

const store = configureStore(
  {
    reducer: {
      user: userReducer,
      product: productReducer,
      category: categoryReducer,
      users: usersReducer,
      orders: ordersReducer,
      winDraw: winDrawReducer,
    },
  },
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
