import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CodeIcon from "@mui/icons-material/Code";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethod.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./Order.css";
import {
  updateUserStart,
  updateUserSuccess,
} from "../../Redux/Slices/usersSlice.jsx";
import {
  updateOrderStart,
  updateOrderSuccess,
} from "../../Redux/Slices/orderSlice.jsx";

export default function Order() {
  const [status, setStatus] = useState();
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const order = useSelector((state) =>
    state.orders.orders.find((order) => order._id === orderId)
  );
  console.log(order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateOrderStart());

    userRequest
      .put(`/orders/${orderId}`, { status })
      .then((res) => {
        console.log(res.data);
        dispatch(updateOrderSuccess(res.data));
        navigate("/orders");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit Order</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowBottom">
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  User Id: {order?.userId}
                </span>
              </div>

              <span className="userShowTitle">&nbsp;&nbsp;&nbsp;Products</span>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  {order?.products.map((product) => (
                    <div key={product._id}>
                      <img
                        src={product.img}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover ",
                          borderRadius: "50% ",
                        }}
                        alt=""
                      />
                      <p>Product ID: {product._id}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {product.price}</p>
                      <p>Title: {product.title}</p>
                      <p>Size: {product.size}</p>
                      <p>Color: {product.color}</p>

                      <br />
                    </div>
                  ))}
                </span>
              </div>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Amount: {order?.amount}
                </span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Address: {order?.address}
                </span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Phone: {order?.phoneNumber}
                </span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  status: {order?.status}
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Status</label>
                  <input
                    type="text"
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="delivered"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <button className="userUpdateButton" onClick={handleClick}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
