import {
  USER_LIST_PENDING,
  USER_LIST_COMPLETE,
  USER_LIST_ERROR,
} from "./type";

import API from "plugins/axios";

const requestGetList = () => ({ type: USER_LIST_PENDING });

export const getList = () => dispatch => {
  dispatch(requestGetList());
  API.get("api-self/v1/user")
    .then(res => {
      dispatch({
        type: USER_LIST_COMPLETE,
        payload: res.data.data,
      });
    })
    .catch(err => {
      dispatch({
        type: USER_LIST_ERROR,
        payload: err,
      });
    });
};
