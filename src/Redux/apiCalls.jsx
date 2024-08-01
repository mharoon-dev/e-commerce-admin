import { publicRequest } from "../requestMethod.js";
import { loginFailure, loginStart, loginSuccess } from "./Slices/userSlice.jsx";


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
