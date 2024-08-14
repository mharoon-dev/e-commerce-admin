import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CodeIcon from "@mui/icons-material/Code";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethod.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./User.css";
import {
  updateUserStart,
  updateUserSuccess,
} from "../../Redux/Slices/usersSlice";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === userId)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    userRequest
      .put(`/users/${user._id}`, { username, email, isAdmin })
      .then(() => {
        console.log("updated");
        dispatch(updateUserSuccess({ ...user, username, email, isAdmin }));
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        dispatch(updateUserFailure());
      });
  };

  return (
    <>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user?.username}</span>
                <span className="userShowUserTitle">{user?.isAdmin}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <div className="userShowInfo">
                <CalendarTodayIcon className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user?.createdAt.slice(0, 10)}
                </span>
              </div>
              <div className="userShowInfo">
                <CodeIcon className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user?.refrenceCode || "No refrence code"}
                </span>
              </div>
              <span className="userShowTitle">Contact Details</span>

              <div className="userShowInfo">
                <PermIdentityIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{user?.email}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="annabeck99"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="annabeck99@gmail.com"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Is Admin</label>
                  <input
                    type="text"
                    value={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.value)}
                    placeholder="true or false"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <PublishIcon className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
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
