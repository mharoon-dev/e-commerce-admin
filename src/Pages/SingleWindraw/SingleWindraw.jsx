import { useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethod.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./SingleWindraw.css";
import {
  updateOrderStart,
  updateOrderSuccess,
} from "../../Redux/Slices/orderSlice.jsx";
import { updateWinDrawFailure, updateWinDrawStart, updateWinDrawSuccess } from "../../Redux/Slices/winDrawSlice.jsx";

export default function SingleWindraw() {
  const [status, setStatus] = useState();
  const location = useLocation();
  const windrawId = location.pathname.split("/")[2];
  const windraw = useSelector((state) =>
    state.winDraw?.winDraws?.find((windraw) => windraw._id === windrawId)
  );

  console.log(windraw);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateWinDrawStart());

    userRequest
      .put(`/windraws/${windrawId}`, { status })
      .then((res) => {
        console.log(res.data);
        dispatch(updateWinDrawSuccess(res.data));
        navigate("/windraws");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        dispatch(updateWinDrawFailure());
      });
  };

  return (
    <>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit Windraw</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowBottom">


              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Name: {windraw?.userDetails?.username}
                </span>

              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Email: {windraw?.userDetails?.email}
                </span>


              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Phone: {windraw?.userDetails?.phoneNumber}
                </span>


              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  refrenceCode: {windraw?.userDetails?.refrenceCode || "No Refrence Code"}
                </span>



              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  byRefrence: {windraw?.userDetails?.byRefrence || "No byRefrence"}
                </span>



              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  refrenceUsers: {windraw?.userDetails?.refrenceUsers?.length || 0}
                </span>

              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  status: {windraw?.status}
                </span>

              </div>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Amount: {windraw?.amount}
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
