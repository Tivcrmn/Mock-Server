import axios from "plugins/axios";

// action-types
const USER_LOGIN = "USER_LOGIN";
const USER_AUTH = "USER_AUTH";

// state
const initialState = {
  token: null,
  redirect: false,
  user: null,
};

// action
export const login = (data) => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "post",
    url: "api-self/v1/login",
    data,
    success(res) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      dispatch({ type: USER_LOGIN, token, user });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const tokenAuth = (token) => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "post",
    url: "api-self/v1/auth",
    headers: { "Authorization": token },
    success(res) {
      dispatch({ type: USER_AUTH, redirect: true, user: res.data });
      resolve(res);
    },
    fail(err) {
      dispatch({ type: USER_AUTH, redirect: false });
      localStorage.removeItem("token");
      resolve(err);
    },
  });
});

// reducer
const auth = (state = initialState, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      token: action.token,
      user: action.user,
    };
  case USER_AUTH:
    return {
      ...state,
      redirect: action.redirect,
      user: action.user,
    };
  default:
    return state;
  }
};

export default auth;

// selector
export const getToken = state => state.auth.token;
export const getRedirect = state => state.auth.redirect;
export const getCurrentUser = state => state.auth.user;
