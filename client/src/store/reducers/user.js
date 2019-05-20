import {
  USER_LIST_PENDING,
  USER_LIST_COMPLETE,
  USER_LIST_ERROR,
} from "../actions/type";

const initialState = {
  lists: [],
  listsLoading: true,
  listsError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case USER_LIST_PENDING:
    return {
      ...state,
      listsLoading: true,
      listsError: false,
    };
  case USER_LIST_COMPLETE:
    return {
      ...state,
      listsLoading: false,
      listsError: false,
      lists: action.payload,
    };
  case USER_LIST_ERROR:
    return {
      ...state,
      listsLoading: false,
      listsError: true,
    };
  default:
    return state;
  }
};
