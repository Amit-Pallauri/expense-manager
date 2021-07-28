import {
  ADD_CATEGORY,
  ADD_EXPENSE,
  CATEGORIES,
  EXPENSE_DETAILS,
  EXPENSE_LOADER,
} from "../actionTypes/expenseActionTypes";
import axios from "axios";
import { SERVER_BASE_URL } from "../../config";
import { notification } from "antd";

export const getDetails = (data) => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_LOADER, payload: true });
    const userToken = JSON.parse(localStorage.getItem("token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
    };
    if (data) {
      var { category, start_date, end_date } = data;
    }
    if (category) {
      const { data } = await axios({
        method: "POST",
        baseURL: `${SERVER_BASE_URL}/api/v1/user/expense_details/${category}`,
        headers: headers,
      });
      dispatch({ type: EXPENSE_LOADER, payload: false });
      return dispatch({
        type: EXPENSE_DETAILS,
        payload: data,
      });
    } else if (category && start_date && end_date) {
      const { data } = await axios({
        method: "POST",
        baseURL: `${SERVER_BASE_URL}/api/v1/user/expense_details/${category}`,
        data: { start_date, end_date },
        headers: headers,
      });
      dispatch({ type: EXPENSE_LOADER, payload: false });
      return dispatch({
        type: EXPENSE_DETAILS,
        payload: data,
      });
    } else if (start_date && end_date) {
      const { data } = await axios({
        method: "POST",
        baseURL: `${SERVER_BASE_URL}/api/v1/user/expense_details`,
        data: { start_date, end_date },
        headers: headers,
      });
      dispatch({ type: EXPENSE_LOADER, payload: false });
      return dispatch({
        type: EXPENSE_DETAILS,
        payload: data,
      });
    } else {
      const { data } = await axios({
        method: "POST",
        baseURL: `${SERVER_BASE_URL}/api/v1/user/expense_details`,
        headers: headers,
      });
      dispatch({ type: EXPENSE_LOADER, payload: false });
      return dispatch({
        type: EXPENSE_DETAILS,
        payload: data,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: EXPENSE_LOADER, payload: false });
    notification.warning({
      message: err.response ? err.response.data.message : err.message,
      className: "notification",
    });
  }
};

export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: EXPENSE_LOADER, payload: true });
    const userToken = JSON.parse(localStorage.getItem("token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
    };
    const { data } = await axios({
      method: "POST",
      baseURL: `${SERVER_BASE_URL}/api/v1/user/add_category`,
      headers: headers,
      data: { name: category },
    });
    dispatch({
      type: ADD_CATEGORY,
      payload: data,
    });
    if (data.category_resource) {
      dispatch({ type: EXPENSE_LOADER, payload: false });
      notification.success({
        message: data.message,
        className: "notification",
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: EXPENSE_LOADER, payload: false });
    notification.warning({
      message: err.response ? err.response.data.message : err.message,
      className: "notification",
    });
  }
};

export const addExpense = (expense) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_LOADER, payload: true });
    const userToken = JSON.parse(localStorage.getItem("token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
    };
    const { data } = await axios({
      method: "POST",
      baseURL: `${SERVER_BASE_URL}/api/v1/user/add_expense`,
      headers: headers,
      data: expense,
    });
    dispatch({
      type: ADD_EXPENSE,
      payload: data,
    });
    if (data.expense_resource) {
      dispatch({ type: EXPENSE_LOADER, payload: false });
      notification.success({
        message: data.message,
        className: "notification",
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: EXPENSE_LOADER, payload: false });
    notification.warning({
      message: err.response ? err.response.data.message : err.message,
      className: "notification",
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
    };
    const { data } = await axios({
      method: "GET",
      baseURL: `${SERVER_BASE_URL}/api/v1/user/categories`,
      headers: headers,
    });
    dispatch({
      type: CATEGORIES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
