import { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CodeIcon from "@mui/icons-material/Code";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../Redux/Slices/usersSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";
import "./User.css";
import { userRequest } from "../../requestMethod.js";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === userId)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin);
  const [phone, setPhone] = useState(user?.phoneNumber);
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(phone);
  }, [phone]);
  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(URL.createObjectURL(file));
      }
    };
  }, [file]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          dispatch(updateUserFailure());
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            userRequest
              .put(`/users/${user._id}`, {
                username,
                email,
                isAdmin: isAdmin === "true" ? true : false,
                phoneNumber: +phone,
                img: downloadURL,
              })
              .then(() => {
                dispatch(
                  updateUserSuccess({
                    ...user,
                    username,
                    email,
                    isAdmin: isAdmin === "true" ? true : false,
                    phoneNumber: +phone,
                    img: downloadURL,
                  })
                );
                alert("User updated successfully");
                navigate("/users");
              })
              .catch((err) => {
                console.log(err);
                alert(err);
                dispatch(updateUserFailure());
              });
          });
        }
      );
    } else {
      userRequest
        .put(`/users/${user._id}`, {
          username,
          email,
          isAdmin,
          phoneNumber: +phone,
        })
        .then(() => {
          dispatch(updateUserSuccess({ ...user, username, email, isAdmin }));
          navigate("/users");
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          dispatch(updateUserFailure());
        });
    }
  };

  return (
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
              src={user?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
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
                {user?.refrenceCode || "No reference code"}
              </span>
            </div>
            <span className="userShowTitle">Details</span>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Email: {user?.email}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">
                Phone: {user?.phoneNumber}
              </span>
            </div>
            {user?.byRefrence && (
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  By Refrence: {user?.byRefrence}
                </span>
              </div>
            )}

            {user?.refrenceUsers && (
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Refrence Users: {user?.refrenceUsers.length}
                </span>
              </div>
            )}

            <div className="userShowInfo">
              <span className="userShowInfoTitle">
                isAdmin: {user?.isAdmin ? "true" : "false"}
              </span>
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
                <label>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03214568798 (easypaise , jazzcash)"
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
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : user?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.png"
                  }
                  alt=""
                />
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  style={{ display: "none" }}
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
              </div>
              <button className="userUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
