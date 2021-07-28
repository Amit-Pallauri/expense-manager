import {
  LOGIN_USER,
  LOGOUT_USER,
  LOADER,
} from "../actionTypes/userActionTypes";

const initialState = {
  token: "",
  loader: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      console.log(payload);
      localStorage.setItem("token", JSON.stringify(payload.token));
      return {
        ...state,
        token: payload.token,
      };

    case LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        token: null,
      };

    case LOADER:
      return {
        ...state,
        loader: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
