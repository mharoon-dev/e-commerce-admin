import "./OrderList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethod.js";
import {
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
} from "../../Redux/Slices/orderSlice.jsx";

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders?.orders);
  console.log(orders);

  useEffect(() => {
    dispatch(getOrderStart());
    userRequest
      .get("/orders")
      .then((res) => {
        console.log(res.data);
        dispatch(getOrderSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getOrderFailure());
      });
  }, [dispatch]);

  const columns = [
    { field: "userId", headerName: "User ID", width: 250 },
    {
      field: "products",
      headerName: "Products",
      width: 200,
      renderCell: (params) => {
        return <span>{params.row.products.length} products</span>;
      },
    },
    { field: "amount", headerName: "Amount", width: 200 },
    {
      field: "address",
      headerName: "Address",
      width: 160,
    },
    {
      field: "status",
      headerName: "status",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/orders/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
      />
    </div>
  );
}
