import { useState } from "react";
import "./NewCategory.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethod.js";
import {
  addCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
} from "../../Redux/Slices/categorySlice.jsx";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";

export default function NewCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleClick = (e) => {
    dispatch(addCategoryStart());
    e.preventDefault();
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
          const category = {
            name,
            img: downloadURL,
          };
          userRequest
            .post("/categories", category)
            .then((res) => {
              console.log(res);
              dispatch(addCategorySuccess(res.data));
              alert("Category added successfully");
              navigate("/categories");
            })
            .catch((err) => {
              console.log(err);
              dispatch(addCategoryFailure());
              alert(err);
            });
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Category</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="title"
            type="text"
            placeholder="man"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="addProductButtonDiv">
          <button onClick={handleClick} className="addProductButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
