import axios from "axios";
import { BASE_URL } from "./utils/urls.jsx";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  .currentUser.accessToken;
  // console.log(TOKEN)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { token: `Bearer ${TOKEN}` },
});
