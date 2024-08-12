import "./CategoryList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../Redux/apiCalls.jsx";
import { userRequest } from "../../requestMethod.js";
import {
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "../../Redux/Slices/categorySlice.jsx";

export default function CategoryList() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getCategoryStart());
    userRequest
      .get("/categories")
      .then((res) => {
        console.log(res.data);
        dispatch(getCategorySuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getCategoryFailure());
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategoryStart());
    userRequest
      .delete(`/categories/${id}`)
      .then((res) => {
        dispatch(deleteCategorySuccess(id));
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        dispatch(deleteCategoryFailure());
      });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },

    { field: "name", headerName: "Category Name", width: 300 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        // console.log(params.row._id);
        return (
          <>
            <Link to={"/category/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={category}
        disableSelectionOnClick
        columns={columns}
        // getRowId={(row) => row._id}
        getRowId={(row) => row._id || Math.random().toString(36).substr(2, 9)}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
