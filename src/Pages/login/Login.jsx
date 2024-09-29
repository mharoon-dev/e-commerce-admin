import { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/apiCalls.jsx";
import axios from "axios";
import { BASE_URL } from "../../utils/urls.jsx";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../Redux/Slices/userSlice.jsx";
import { useNavigate } from "react-router-dom";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(loginStart());
      api
        .post("/auth/login", {
          username,
          password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem(
            "adminToken",
            JSON.stringify(res.data.accessToken)
          );
          dispatch(loginSuccess(res.data.data));
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
          dispatch(loginFailure());
        });
    } else {
      toast.error("Please fill all the fields 📝");
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
