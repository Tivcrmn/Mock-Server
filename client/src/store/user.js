import axios from "plugins/axios";

// action-types
const USER_LIST = "USER_LIST";
const USER_ADD = "USER_ADD";
const USER_DELETE = "USER_DELETE";

// state
const initialState = {
  lists: [],
};

// action
export const getUserList = () => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "get",
    url: "api-self/v1/user",
    success(res) {
      dispatch({ type: USER_LIST, lists: res.data });
      resolve(res);
    },
    fail(err) {
      reject(err);
    },
  });
});

export const addUser = (user) => dispatch => new Promise((resolve, reject) => {
  const data = Object.assign({}, user);
  axios({
    dispatch,
    method: "post",
    url: "api-self/v1/register",
    data,
    success(res) {
      dispatch({ type: USER_DELETE });
      resolve(res);
    },
    fail(err) {
      reject(err);
    },
  });
});

export const deleteUser = (id) => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "delete",
    url: `api-self/v1/user/${id}`,
    success(res) {
      dispatch({ type: USER_ADD });
      resolve(res);
    },
    fail(err) {
      reject(err);
    },
  });
});

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
  case USER_LIST:
    return {
      ...state,
      lists: action.lists,
    };
  case USER_ADD:
  case USER_DELETE:
  default:
    return state;
  }
};

export default user;

// selector
export const getUsers = state => state.user.lists;
