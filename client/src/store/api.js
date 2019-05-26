import axios from "plugins/axios";
import { cloneDeep } from "lodash";

// action-types
const API_LIST = "API_LIST";
const API_ADD = "API_ADD";
const API_DELETE = "API_DELETE";
const API_EDIT = "API_EDIT";
const API_INFO = "API_INFO";

// state
const initialState = {
  lists: [],
  api: {},
};

// action
export const getApiList = (systemId) => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "get",
    url: `api-self/v1/system/${systemId}/api`,
    success(res) {
      dispatch({ type: API_LIST, lists: res.data });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const addApi = (systemId, api) => dispatch => new Promise((resolve, reject) => {
  const data = cloneDeep(api);
  axios({
    dispatch,
    method: "post",
    url: `api-self/v1/system/${systemId}/api`,
    data,
    success(res) {
      dispatch({ type: API_ADD });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const deleteApi = (systemId, apiId) => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "delete",
    url: `api-self/v1/system/${systemId}/api/${apiId}`,
    success(res) {
      dispatch({ type: API_DELETE });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const updateApi = (api) => dispatch => new Promise((resolve, reject) => {
  const data = cloneDeep(api);
  axios({
    dispatch,
    method: "put",
    url: `api-self/v1/system/${api.systemId}/api/${api._id}`,
    data,
    success(res) {
      dispatch({ type: API_EDIT });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

export const getApiInfo = (systemId, apiId) => dispatch => new Promise((resolve, reject) => {
  axios({
    dispatch,
    method: "get",
    url: `api-self/v1/system/${systemId}/api/${apiId}`,
    success(res) {
      dispatch({ type: API_INFO, api: res.data });
      resolve(res);
    },
    fail(err) {
      resolve(err);
    },
  });
});

// reducer
const api = (state = initialState, action) => {
  switch (action.type) {
  case API_LIST:
    return {
      ...state,
      lists: action.lists,
    };
  case API_INFO:
    return {
      ...state,
      api: action.api,
    };
  case API_ADD:
  case API_DELETE:
  case API_EDIT:
  default:
    return state;
  }
};

export default api;

// selector
export const getApis = state => state.api.lists;
export const getApi = state => state.api.api;
