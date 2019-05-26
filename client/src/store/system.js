import axios from "plugins/axios";
import { cloneDeep } from "lodash";

// action-types
const SYSTEM_LIST = "SYSTEM_LIST";
const SYSTEM_ADD = "SYSTEM_ADD";
const SYSTEM_DELETE = "SYSTEM_DELETE";
const SYSTEM_EDIT = "SYSTEM_EDIT";
const SYSTEM_INFO = "SYSTEM_INFO";

// state
const initialState = {
  lists: [],
  system: {},
};

// action
export const getSystemList = () => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "get",
    url: "api-self/v1/system",
    success(res) {
      dispatch({ type: SYSTEM_LIST, lists: res.data });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const addSystem = (system) => dispatch => new Promise((resolve, reject) => {
  const data = cloneDeep(system);
  axios({
    dispatch,
    method: "post",
    url: "api-self/v1/system",
    data,
    success(res) {
      dispatch({ type: SYSTEM_ADD });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const deleteSystem = (id) => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "delete",
    url: `api-self/v1/system/${id}`,
    success(res) {
      dispatch({ type: SYSTEM_DELETE });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const updateSystem = (system) => dispatch => new Promise((resolve, reject) => {
  const data = cloneDeep(system);
  axios({
    dispatch,
    method: "put",
    url: `api-self/v1/system/${system._id}`,
    data,
    success(res) {
      dispatch({ type: SYSTEM_EDIT });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const getSystemInfo = (id) => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "get",
    url: `api-self/v1/system/${id}`,
    success(res) {
      dispatch({ type: SYSTEM_INFO, system: res.data });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

// reducer
const system = (state = initialState, action) => {
  switch (action.type) {
  case SYSTEM_LIST:
    return {
      ...state,
      lists: action.lists,
    };
  case SYSTEM_INFO:
    return {
      ...state,
      system: action.system,
    };
  case SYSTEM_ADD:
  case SYSTEM_DELETE:
  case SYSTEM_EDIT:
  default:
    return state;
  }
};

export default system;

// selector
export const getSystems = state => state.system.lists;
export const getSystem = state => state.system.system;
