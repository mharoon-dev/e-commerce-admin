import { useState } from "react";
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
import { useSelector } from "react-redux";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";

function App() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser.isAdmin);
  console.log(user);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          {/* <Route path="/newproduct" element={<NewProduct />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
