import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOADER,
} from "../actionTypes/userActionTypes";
import axios from "axios";
import { SERVER_BASE_URL } from "../../config";
import { notification } from "antd";

export const registerUser = (user, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });
    const headers = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      `${SERVER_BASE_URL}/api/v1/register`,
      user,
      { headers: headers }
    );
    console.log(data);
    dispatch({
      type: REGISTER_USER,
      payload: data,
    });
    if (data.user) {
      dispatch({ type: LOADER, payload: false });
      history.push("/signIn");
      notification.success({
        message: data.message,
        className: "notification",
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: LOADER, payload: false });
    notification.warning({
      message: err.response ? err.response.data.message : err.message,
      className: "notification",
    });
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  console.log(user);
  try {
    dispatch({ type: LOADER, payload: true });
    const headers = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(`${SERVER_BASE_URL}/api/v1/login`, user, {
      headers: headers,
    });
    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
    if (data.token) {
      dispatch({ type: LOADER, payload: false });
      history.push("/dashboard");
      notification.success({
        message: "logged in successfully",
        className: "notification",
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: LOADER, payload: false });
    notification.warning({
      message: err.response.data ? err.response.data.message : err.message,
      className: "notification",
    });
  }
};

export const logoutUser = (history) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });
    const userToken = JSON.parse(localStorage.getItem("token"));
    if (userToken) {
      dispatch({
        type: LOGOUT_USER,
      });
      dispatch({ type: LOADER, payload: false });
      notification.success({
        message: "loggedOut successfully",
        className: "notification",
      });
      history.push("/signIn");
    }
  } catch (err) {
    console.log(err);
    notification.warning({
      message: err.response.data ? err.response.data.message : err.message,
      className: "notification",
    });
  }
};
