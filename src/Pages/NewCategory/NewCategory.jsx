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

export default function NewCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleClick = (e) => {
    dispatch(addCategoryStart());
    e.preventDefault();
    userRequest
      .post("/categories", { name })
      .then((res) => {
        console.log(res.data);
        dispatch(addCategorySuccess({ name }));
        navigate("/categories");
      })
      .catch((err) => {
        console.log(err);
        dispatch(addCategoryFailure());
      });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Category</h1>
      <form className="addProductForm">
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
