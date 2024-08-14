import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Topbar from "./Components/Topbar/Topbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import UserList from "./Pages/UserList/UserList.jsx";
import User from "./Pages/User/User.jsx";
import NewUser from "./Pages/NewUser/NewUser.jsx";
import ProductList from "./Pages/ProductList/ProductList.jsx";
import Product from "./Pages/Product/Product.jsx";
import Login from "./Pages/login/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import NewProduct from "./Pages/NewProduct/NewProduct.jsx";
import axios from "axios";
import {BASE_URL} from "./utils/urls.jsx"
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "./Redux/Slices/userSlice.jsx";
import CategoryList from "./Pages/CategoryList/CategoryList.jsx";
import Category from "./Pages/Category/Category.jsx";
import NewCategory from "./Pages/NewCategory/NewCategory.jsx";
import OrderList from "./Pages/OrderList/OrderList.jsx";
import Order from "./Pages/Order/Order.jsx";

function App() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state?.user?.currentUser?.isAdmin);
  console.log(user);
  const dispatch = useDispatch();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const api = axios.create({
    baseURL: BASE_URL,
  });

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const token = JSON.parse(localStorage.getItem("adminToken"));
      if (!token) return dispatch(loginFailure()) && console.log("no token");

      dispatch(loginStart());

      try {
        const res = await api.get("/auth/isuserloggedin", {
          headers: { authorization: `Bearer ${token}` },
        });
        if (res.data) {
          console.log(res.data);
          dispatch(loginSuccess(res.data.data));
        }
      } catch (error) {
        console.log(error);
        dispatch(loginFailure(error));
      }
    };

    isUserLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      {user === true && <Topbar open={open} toggleDrawer={toggleDrawer} />}
      <div className="container">
        {user === true && <Sidebar open={open} toggleDrawer={toggleDrawer} />}
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={!user && <Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/orders/:orderId" element={<Order />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/newcategory" element={<NewCategory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
