import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp, history) => {
  return (dispatch, getState) => {
    const totalPrice = getState().burgerBuilder.totalPrice;
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVhh4z1RPX5uGVGrAlO0pc4EbQNrai-Gg";

    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVhh4z1RPX5uGVGrAlO0pc4EbQNrai-Gg";
    }
    axios
      .post(url, authData)
      .then(({ data }) => {
        const expirationDate = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", data.localId);
        dispatch(authSuccess(data.idToken, data.localId));
        dispatch(checkAuthTimeout(data.expiresIn));
        totalPrice > 4 ? history.push("/checkout") : history.push("/");
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
