import "./NewUser.css";
import { useState } from "react";
import { userRequest } from "../../requestMethod.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function NewUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [phone, setPhone] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const refrenceCode = Math.floor(Math.random() * 1000006);
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
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {
            username,
            email,
            password,
            refrenceCode,
            phoneNumber: +phone,
            img: downloadURL,
          };
          console.log(user);
          userRequest
            .post("/auth/register", user)
            .then((res) => {
              console.log(res);
              alert("User has been created");
              navigate("/users");
            })
            .catch((err) => {
              console.log(err);
              alert(err);
            });
        });
      }
    );
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div>
          <div className="newUserItem">
            <label>Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="john"
            />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="john@gmail.com"
            />
          </div>
          <div className="newUserItem">
            <label>Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="03212345678 (easypaise , jazzcash)"
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </div>
          <div className="addProductItem">
            <label>User Image</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <button className="newUserButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
