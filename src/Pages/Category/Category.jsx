import "./Category.css";
import PublishIcon from "@mui/icons-material/Publish";
import Chart from "../../Components/Chart/Chart.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { userRequest } from "../../requestMethod.js";
import { useDispatch } from "react-redux";
import {
  updateCategoryStart,
  updateCategorySuccess,
} from "../../Redux/Slices/categorySlice.jsx";

export default function Category() {
  const location = useLocation();
  const categoryId = location.pathname.split("/")[2];
  const category = useSelector((state) =>
    state.category.category.find((category) => category._id === categoryId)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(category.name);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateCategoryStart());
    userRequest
      .put(`/categories/${categoryId}`, {
        name,
      })
      .then(() => {
        console.log("updated");
        dispatch(updateCategorySuccess({ ...category, name }));
        alert("Category updated successfully");
        navigate("/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Category</h1>
        <Link to="/newcategory">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Category Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={category.name}
            />
          </div>
          <button
            className="productButton categoryUpdate"
            type="submit"
            onClick={handleClick}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
