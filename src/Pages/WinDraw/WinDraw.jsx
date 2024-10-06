import "./WinDraw.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethod.js";
import { getWinDrawFailure, getWinDrawStart, getWinDrawSuccess } from "../../Redux/Slices/winDrawSlice.jsx";

export default function WinDraw() {
  const dispatch = useDispatch();
  const windraws = useSelector((state) => state?.winDraw?.winDraws);
  console.log(windraws);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  useEffect(() => {
    dispatch(getWinDrawStart());
    userRequest
      .get("/windraws")
      .then((res) => {
        console.log(res.data);
        dispatch(getWinDrawSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getWinDrawFailure());
      });
  }, [dispatch]);

  const columns = [
    { field: "amount", headerName: "Amount", width: 300 },

    {
      field: "createdAt",
      headerName: "Date",
      width: 300,

      renderCell: (params) => {
        return new Date(params.row.createdAt).toLocaleString();
      },
    },

    {
      field: "status",
      headerName: "status",
      width: 150,
      renderCell: (params) => {
        return <Button type={params.row.status} />;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/windraw/" + params.row._id}>
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
        rows={windraws}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
      />
    </div>
  );
}
