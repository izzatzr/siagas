import { LOGIN_SUCCESS, LOGOUT } from "../types";
import  secureLocalStorage  from  "react-secure-storage";

const isLoggedIn = secureLocalStorage.getItem("isLoggedIn") ? true : false;

const initialState = {
  isLoggedIn: isLoggedIn,
};

// eslint-disable-next-line
export default (state = initialState, actions) => {
  const { type } = actions;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
