import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { userRequest } from "../../requestMethod.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
} from "../../Redux/Slices/usersSlice.jsx";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
    },
    {
      field: "username",
      headerName: "User Name",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "refrenceCode",
      headerName: "Refrence Code",
      width: 250,

      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.refrenceCode || "No Refrence Code"}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getUserStart());
    userRequest
      .get("/users")
      .then((res) => {
        console.log(res.data);
        dispatch(getUserSuccess(res.data));
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getUserFailure());
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteUserStart());
    userRequest
      .delete(`/users/${id}`)
      .then((res) => {
        dispatch(deleteUserSuccess(id));
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        dispatch(deleteUserFailure());
      });
  };

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id || Math.random().toString(36).substr(2, 9)}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
